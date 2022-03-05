// server imports
import express from "express";
import { createServer as HttpServer } from "http";

// env
import { env } from "process";

// storage imports
import Client from "./Engines/StorageEngine/BasicStore";

// Socket import
import { Server as SocketServer } from "socket.io";
import sharedsession from "express-socket.io-session";
import { session_config } from "./routes/index";
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
    origin: "http://localhost:3000",
    credentials: true,
  },
});

io.use(
  sharedsession(session_config, {
    autoSave: true,
  })
);

// websock handlers
io.on("connection", IoController.onConnection);

// start server
(async () => {
  try {
    await Client.connect();
    httpServer.listen(PORT, "localhost", () => {
      console.log(`Server Listening on ${PORT}`);
    });
  } catch (err) {
    console.log(error);
  }
})();
