import SocketController from './SocketController';
import SocketStore from '../Engines/CacheEngine/SockStore';
import usrStorage from '../Engines/StorageEngine/UserStore';

export default class IoController {
  static async onConnection(socket) {
    console.log(socket.id + " Connected");

    // Initial Setup
    const { usrId } = socket.handshake.session;
    await SocketStore.set(socket.id, usrId);
    socket.join(usrId);

    // Send Available Users
    const users = await SocketController.onUsersList(usrId);
    socket.emit("UsersList", users);

    // Private message handler
    socket.on("PrivateMsgSent", async (data) => {
      const { room, message, timestamp } = data;

      // reciever address
      room = await SocketStore.get(room);

      // sender address
      let sender = await SocketStore.get(socket.id);

      // Save Message to DB
      await SocketController.onMessage(sender, room, {message, timestamp});

      sender = await usrStorage.findUniqUser({ _id: sender }).userName;
      const ForwardMessage = { sender, message, timestamp };

      // Send message to reciever
      socket.to(room).emit("PrivateMsgForward", ForwardMessage);
    });

    // testing purposes
    socket.on("pubMsg", async (data) => {
      console.log(data);
      const { message, timestamp } = data;
      const sender = await SocketStore.get(socket.id);
      SocketController.onMessage(sender, sender, {message, timestamp});
    })

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
