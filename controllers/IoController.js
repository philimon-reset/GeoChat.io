import SocketController from './SocketController';
import SocketStore from '../Engines/CacheEngine/SockStore';


export default class IoController {

  static async onConnection(socket) {
    console.log(socket.id + "connected");

    const { usrId } = socket.handshake.session
    await SocketStore.set(socket.id, usrId);
    socket.join(usrId);

    socket.emit("UsersList", "Dummy data");

    socket.on("PrivateMsg", SocketController.onMessage);
  }

}

