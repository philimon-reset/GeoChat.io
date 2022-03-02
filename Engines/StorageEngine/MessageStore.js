import Client, { BasicStore } from "./BasicStore";
import usrStorage from './UserStore';

export class MessageStore extends BasicStore {
  msgCollection = null;

  constructor(MongoInstance) {
    super();
    this.msgCollection = MongoInstance.db().collection('messages');
  }

  async newMessage(from, to, message) {

    from = (await usrStorage.findUniqUser({ _id: from })).userName;
    to = (await usrStorage.findUniqUser({ _id: to })).userName;
    message.sender = from;

    console.log(from, to);
    const chat = await this.msgCollection.findOne({ "$or" : [{ chatName: `${from}|${to}` }, { chatName: `${to}|${from}` }] });

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


  async getMessages(from, to) {

    const chat = await this.msgCollection.findOne({ "$or" : [{ chatName: `${from}|${to}` }, { chatName: `${to}|${from}` }] });
    if(chat) {
      return chat.content;
    } else {
      return [];
    }
  }
}

const msgStorage = new MessageStore(Client);
export default msgStorage;
