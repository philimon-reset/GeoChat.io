import SocketController from './SocketController';
import SocketStore from '../Engines/CacheEngine/SockStore';


export default class IoController {
  static async onConnection(socket) {
    console.log(socket.id + " Connected");

    // Initial Setup
    const { usrId } = socket.handshake.session;
    console.log(socket.handshake);
    await SocketStore.set(socket.id, usrId);
    socket.join(usrId);

    // Send Available Users
    socket.emit("UsersList", "Dummy data");

    // Private message handler
    socket.on("PrivateMsgSent", async (data) => {
      const { room, message } = data;
      room = await SocketStore.get(room);

      // Save Message to DB
      SocketController.onMessage(room, data);

      const ForwardMessage = { message, from: socket.id };

      // Send message to reciever
      socket.to(room).emit("PrivateMsgForward", ForwardMessage);
    });


    // Disconnection Handler
    socket.on("disconnect", async (reason) => {
      console.log(socket.id + " Disconnected");
      console.log(`Reason: ${reason}`);

      const { usrId } = socket.handshake.session;
      await SocketStore.del(socket.id);
      socket.leave(usrId);
    });
  }
}
