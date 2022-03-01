import Client, { BasicStore } from "./BasicStore";

export class MessageStore extends BasicStore {
  msgCollection = null;

  constructor(MongoInstance) {
    super();
    this.msgCollection = MongoInstance.db().collection('messages');
  }

  async newMessage(from, to, message) {
    let chat = null;
    chat = await this.msgCollection.findOne({ "$or" : [{ chatName: `${from}|${to}` }, { chatName: `${to}|${from}` }] });
    if (chat) {
      const newContent = { ...chat, content: chat.content.concat(message)};
      return this.msgCollection.updateOne({ chatName: chat.chatName }, {
        "$set": newContent
      });
    } else {
      return this.msgCollection.insertOne({
        chatName: `${from}|${to}`,
        content: [message]
      });
    }
  }
}

const msgStorage = new MessageStore(Client);
export default msgStorage;
