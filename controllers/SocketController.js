import msgStorage from "../Engines/StorageEngine/MessageStore";

export default class SocketController {

  static async onMessage(sender, data) {
    const { reciever, message } = data;
    await msgStorage.newMessage(sender, reciever, message);
  }
}