import usrStorage, { UserStore } from "../Engines/StorageEngine/UserStore";
import { loginError } from "../Engines/errors";

export default class AuthController {

  static async isIn(req, res) {

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
      res.status(200).json(response).end();
    } catch (err) {
      response.ErrorCode = err instanceof loginError ? err.code : 'MISC';
      res.status(400).json(response).end();
    }
  }

}
