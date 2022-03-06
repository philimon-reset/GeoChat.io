import Client, { BasicStore } from "./BasicStore";
import usrStorage from "./UserStore";

export class MessageStore extends BasicStore {
  msgCollection = null;

  constructor(MongoInstance) {
    super();
    this.msgCollection = MongoInstance.db().collection("messages");
  }

  async newMessage(sender, reciever, message) {
    const from = sender;
    const to = (await usrStorage.findUniqUser({ _id: reciever })).userName;
    message.sender = from;

    const chat = await this.msgCollection.findOne({
      $or: [{ chatName: `${from}|${to}` }, { chatName: `${to}|${from}` }],
    });

    if (chat) {
      const newContent = { ...chat, content: chat.content.concat(message) };
      return this.msgCollection.updateOne(
        { chatName: chat.chatName },
        {
          $set: newContent,
        }
      );
    } else {
      return this.msgCollection.insertOne({
        chatName: `${from}|${to}`,
        content: [message],
      });
    }
  }

  async getMessages(from, to) {
    const chat = await this.msgCollection.findOne({
      $or: [{ chatName: `${from}|${to}` }, { chatName: `${to}|${from}` }],
    });
    if (chat) {
      return chat.content;
    } else {
      return [];
    }
  }
}

const msgStorage = new MessageStore(Client);
export default msgStorage;
