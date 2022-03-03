import SocketController from './SocketController';
import SocketStore from '../Engines/CacheEngine/SockStore';
import usrStorage from '../Engines/StorageEngine/UserStore';

export default class IoController {
  static async onConnection(socket) {
    console.log(socket.id + " Connected");

    // Initial Setup
    const { usrId } = socket.handshake.session;
    const { userName } = await usrStorage.findUniqUser({ _id: usrId });
    await SocketStore.set(socket.id, usrId);
    await SocketStore.incrCount(usrId);
    socket.join(usrId);

    // Send Available Users
    const users = await SocketController.onUsersList(usrId);
    socket.emit("UsersList", users);

    // notify new user
    if(await SocketStore.getCount(usrId) == 1) {
      socket.broadcast.emit("NewUser", {
        channel: socket.id, userName 
      });
    }

    // Private message handler
    socket.on("PrivateMsgSent", async (data) => {
      const { room, message, timestamp, sender } = data;

      // reciever address
      const reciever = await SocketStore.get(room);

      // Save Message to DB
      await SocketController.onMessage(sender, reciever, {message, timestamp});

      sender = (await usrStorage.findUniqUser({ _id: sender }));
      const ForwardMessage = { sender , message, timestamp };

      // Send message to reciever
      console.log("ForwardMessage", ForwardMessage)
      socket.to(reciever).emit("PrivateMsgForward", ForwardMessage);
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
      socket.leave(usrId);

      await SocketStore.del(socket.id);
      await SocketStore.decrCount(usrId);

      if(await SocketStore.getCount(usrId)) {
        const { userName } = await usrStorage.findUniqUser({ _id: usrId });
        const newChannel = await SocketStore.getNearChannel(usrId);
        socket.broadcast.emit("ChannelUpdate", {
          userName, newChannel
        })
      } else {
        socket.broadcast.emit("UserDisconnect", {
          userName
        })
      }
    });
  }
}
