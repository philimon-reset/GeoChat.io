import { MongoClient, ObjectId } from "mongodb";
import { env } from "process";

export class BasicStore {
  toObjectId(strId) {
    return new ObjectId(strId);
  }

  fromObjectId(objId) {
    return objId.toString();
  }
}


const host = env.dbHost || '127.0.0.1';
const port = env.dbPort || 27017;
const database = env.dbName || 'chatDb';
const Client = new MongoClient(`mongodb://${host}:${port}/${database}`);

export default Client;
