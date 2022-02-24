// server imports
import express from "express";
import { createServer as HttpServer} from "http";

// socket imports
import { Server as SocketServer } from "socket.io";

// env
import { env } from "process";

// storage imports
import usrStorage from "./Engines/StorageEngine/UserStore";

// router import
import router from "./routes";

// ==================================================================================

const PORT = env.chatAppPort || 8000;

// Express APP
const app = express();

// http server
const httpServer = HttpServer(app);

// socket instance
const io = new SocketServer(httpServer);

// Routes
app.use("/api", router);

// websock handlers
io.on("connection", (socket) => {
  console.log("connected");
  socket.on("chat message", (data) => {
    console.log(data);
  });
});

// start server
(async () => {
  try {
    await usrStorage.connect();
    httpServer.listen(PORT, "0.0.0.0", () => {
      console.log(`Server Listening on ${PORT}`);
    });
  } catch (err) {
    console.log(error);
  }
})();

