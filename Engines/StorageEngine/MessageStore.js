import Client, { BasicStore } from "./BasicStore";

export class MessageStore extends BasicStore {
  msgCollection = null;

  constructor(MongoInstance) {
    this.msgCollection = MongoInstance.db().collection('messages');
  }

  async newMessage(from, to, message) {
    let chat = null;
    chat = await this.msgCollection.findOne({ "$or" : [{ chatName: `${from}|${to}` }, { chatName: `${to}|${from}` }] });
    if (chat) {
      return this.msgCollection.updateOne({ chatName: chat.chatName }, {
        ...chat,
        content: [ ...content, message]
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
