import { MongoClient, ObjectId } from "mongodb";
import { env } from "process";


export default class BasicStore {
  client = null;
  connected = false;
  db = null;

  constructor() {
    const host = env.dbHost || '127.0.0.1';
    const port = env.dbPort || 27017;
    const database = env.dbName || 'chatDb';
    this.client = new MongoClient(`mongodb://${host}:${port}/${database}`);
  }

  async connect() {
    await this.client.connect();
    this.db = this.client.db();
  }

  isConnected() {
    return this.connected;
  }

  toObjectId(strId) {
    return new ObjectId(strId);
  }

  fromObjectId(objId) {
    return objId.toString();
  }
}
