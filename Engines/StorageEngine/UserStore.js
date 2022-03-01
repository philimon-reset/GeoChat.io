import Client, { BasicStore } from "./BasicStore";
import { hash } from "../utils.js"
import { usrRegisterError } from "../errors";


export class UserStore extends BasicStore {
  usrCollection = null;

  constructor(MongoInstance) {
    super();
    this.usrCollection = MongoInstance.db().collection('users')
  }

  async newUser(usrName, usrEmail, usrPass) {
    if (await this.findUniqUser({userName : usrName})) {
      throw new usrRegisterError('Username Taken', 'USERNAME');
    }
    if (await this.findUniqUser({ email: usrEmail })) {
      throw new usrRegisterError('Email Taken', 'EMAIL');
    }
    return this.usrCollection.insertOne({
      userName: usrName,
      email: usrEmail,
      pass: hash(usrPass)
    })
  }

  async findUniqUser(filter) {
    if ('_id' in filter) {
      filter._id = this.toObjectId(filter._id);
    }
    return this.usrCollection.findOne(filter);
  }

  async findUsers(filter) {
    if ('_id' in filter) {
      filter._id = this.toObjectId(filter._id);
    }
    return this.usrCollection.find(filter);
  }

  static verifyUser(actualPass, reqPass) {
    return hash(reqPass) === actualPass;
  }
}

const usrStorage = new UserStore(Client);
export default usrStorage;
