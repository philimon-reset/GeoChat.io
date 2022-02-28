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
      const val = raw[key];
      if (!(temp.includes(val)) && val !== currentUser) {
        const usr = await usrStorage.findUniqUser({ _id: val })
        // socket id of user
        usr.channel = key

        // clean up
        delete usr.pass;
        delete usr.email;
        delete usr._id;

        res.push(usr);
        temp.push(val);
      }
    }
    return res;
  }
}