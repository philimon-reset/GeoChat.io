import usrStorage, { UserStore } from "../Engines/StorageEngine/UserStore";
import { loginError } from "../Engines/errors";

export default class AuthController {

  static isIn(req, res) {
    if (req.session.usrId) {
      res.status(200).end();
    } else {
      res.status(400).end();
    }
  }

  static logout(req, res) {
    try{
      req.session.destroy();
      res.status(200).end();
    } catch(err) {
      res.status(400).end();
    }
  }

  static async login(req, res) {
    let response = {};
    const { usrName, pass } = req.body;

    try {
      const user = await usrStorage.findUniqUser({ userName: usrName });

      if (!user || !UserStore.verifyUser(user.pass, pass)) {
        throw new loginError("login Error", "LOGINERR");
      }

      req.session.usrId = usrStorage.fromObjectId(user._id);
      res.status(200);
    } catch (err) {
      res.status(400);
      response.ErrorCode = err instanceof loginError ? err.code : 'MISC';
    } finally {
      res.json(response).end();
    }

  }

}
