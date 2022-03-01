import usrStorage from "../Engines/StorageEngine/UserStore";
import { usrRegisterError } from "../Engines/errors";

export default class UserController {

  static async newUser(req, res) {
    const { email, usrName, pass }  = req.body;

    try {
      const result = await usrStorage.newUser(usrName, email, pass);
      req.session.usrId = usrStorage.fromObjectId(result.insertedId);
      res.status(201).json({ usrName }).end();
    } catch(err) {
      res.status(400).json({
        ErrorCode: err instanceof usrRegisterError ? err.code : 'MISC'
      }).end();
    }
  }
}
