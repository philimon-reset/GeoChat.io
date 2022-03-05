import msgStorage from "../Engines/StorageEngine/MessageStore";
import SocketStore from "../Engines/CacheEngine/SockStore";
import usrStorage from "../Engines/StorageEngine/UserStore";

export default class SocketController {
  static async onMessage(sender, reciever, data) {
    await msgStorage.newMessage(sender, reciever, data);
  }

  static async onUsersList(currentUser) {
    const raw = await SocketStore.getAll();
    let res = [];
    const temp = [];
    for (let key in raw) {
      const connectedUser = raw[key];
      if (
        connectedUser &&
        !temp.includes(connectedUser) &&
        connectedUser !== currentUser
      ) {
        const usr = await usrStorage.findUniqUser({ _id: connectedUser });

        // socket id of user
        usr.channel = key;

        // clean up
        delete usr.pass;
        delete usr.email;
        delete usr._id;

        res.push(usr);
        temp.push(connectedUser);
      }
    }
    return res;
  }

  static async onDisconnect(currentUser) {
    await SocketStore.delAllonId(currentUser);
  }
}
