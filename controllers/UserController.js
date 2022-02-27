import usrStorage from "../Engines/StorageEngine/UserStore";
import { usrRegisterError } from "../Engines/errors";

export default class UserController {

  static async newUser(req, res) {
    const { email, usrName, pass }  = req.body;

    let response ={};

    try {
      const result = await usrStorage.newUser(usrName, email, pass);
      req.session.usrId = usrStorage.fromObjectId(result.insertedId);
      res.status(201);
    } catch(err) {
      res.status(400);
      response.ErrorCode = err instanceof usrRegisterError ? err.code : 'MISC';
    } finally {
      res.json(response).end();
    }
  }

}
