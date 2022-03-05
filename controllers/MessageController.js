import msgStorage from "../Engines/StorageEngine/MessageStore";

export default class MessageController {
  static async getMessages(req, res) {
    const { from, to } = req.body;

    const messages = await msgStorage.getMessages(from, to);
    res.status(200).json({ messages }).end();
  }
}
