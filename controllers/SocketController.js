import msgStorage from "../Engines/StorageEngine/MessageStore";

export default class SocketController {

  static async onMessage(sender, reciever, data) {
    await msgStorage.newMessage(sender, reciever, data);
  }
}