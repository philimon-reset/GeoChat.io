import SocketController from "./SocketController";
import SocketStore from "../Engines/CacheEngine/SockStore";
import usrStorage from "../Engines/StorageEngine/UserStore";

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
    if ((await SocketStore.getCount(usrId)) == 1) {
      socket.broadcast.emit("NewUser", {
        channel: socket.id,
        userName,
      });
    }

    // Private message handler
    socket.on("PrivateMsgSent", async (data) => {
      const { room, message, timestamp, sender } = data;

      // reciever address
      const reciever = await SocketStore.get(room);

      // Save Message to DB
      await SocketController.onMessage(sender, reciever, {
        message,
        timestamp,
      });

      const sender_s = usrStorage.fromObjectId(
        (await usrStorage.findUniqUser({ userName: sender }))._id
      );

      const ForwardMessage = { sender, message, timestamp };

      // Send message to reciever
      socket
        .to(sender_s)
        .to(reciever)
        .emit("PrivateMsgForward", ForwardMessage);
      // hot fix
      socket.to(sender_s).emit("UsersList", users);
    });


    // Disconnection Handler
    socket.on("disconnect", async (reason) => {
      console.log(socket.id + " Disconnected");
      console.log(`Reason: ${reason}`);

      const { usrId } = socket.handshake.session;
      socket.leave(usrId);

      if (reason === "client namespace disconnect") {
        await SocketController.onDisconnect(usrId);
        socket.broadcast.emit("UserDisconnect", {
          userName,
        });
      } else {
        await SocketStore.del(socket.id);
        await SocketStore.decrCount(usrId);

        if (await SocketStore.getCount(usrId)) {
          const { userName } = await usrStorage.findUniqUser({ _id: usrId });
          const newChannel = await SocketStore.getNearChannel(usrId);
          socket.broadcast.emit("ChannelUpdate", {
            userName,
            newChannel,
          });
        } else {
          socket.broadcast.emit("UserDisconnect", {
            userName,
          });
        }
      }
    });
  }
}
