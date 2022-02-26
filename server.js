// server imports
import express from "express";
import { createServer as HttpServer} from "http";

// env
import { env } from "process";

// storage imports
import usrStorage from "./Engines/StorageEngine/UserStore";

// Socket import
import { Server as SocketServer } from 'socket.io';
import sharedsession from "express-socket.io-session";
import session from './routes/index';
import IoController from "./controllers/IoController";


// router import
import router from "./routes";

// ==================================================================================

const PORT = env.chatAppPort || 8000;

// Express APP
const app = express();
app.use(router);

// http server
const httpServer = HttpServer(app);

// socket instance
const io = new SocketServer(httpServer, {
  cors: {
    origin: "*"
  }
});

io.use(sharedsession(session));

// websock handlers
io.on("connection", IoController.onConnection);

// start server
(async () => {
  try {
    await usrStorage.connect();
    httpServer.listen(PORT, "127.0.0.1", () => {
      console.log(`Server Listening on ${PORT}`);
    });
  } catch (err) {
    console.log(error);
  }
})();

