// server imports
import express from "express";
import session from "express-session";
import sessionHandler from "express-sessions";
import bodyParser from "body-parser";
import { createServer } from "http";
import cors from 'cors';

// sock imports
import { Server } from "socket.io";

// env
import { env } from "process";

// storage imports
import Redis from "ioredis";
import UserStore from "./Engines/StorageEngine/UserStore";

// error import
import { usrRegisterError, loginError } from "./Engines/errors";

// ==================================================================================

const PORT = env.chatAppPort || 8000;
const SECRET = env.chatAppSecret || "IHAVENOSECRETS";

// Express APP
const app = express();

// http server
const httpServer = createServer(app);

// socket instance
const io = new Server(httpServer);

//redis instance
const redisClient = new Redis();

// DB instance
const usrStorage = new UserStore();

// Middleware
app.use(express.json());

app.use(express.static('./my-app/build'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:8001'
}))

app.use(
  session({
    secret: SECRET,
    cookie: {
      maxAge: 86400000,
    },
    resave: false,
    saveUninitialized: false,
    store: new sessionHandler({
      storage: "redis",
      collection: "sessions",
      instance: redisClient,
    }),
  })
);


// Routes
app.get("/isIn", (req, res) => {
  response = { status: 0 }
  if (req.session.usrId) {
    res.status(200);
    response.status = 1;
  } else {
    res.status(400);
  }
  res.json(response).end();
})

app.get('/logout', (req, res) => {
  try{
    req.session.destroy();
    res.status(200).end();
  } catch(err) {
    res.status(400).end();
  }
});

app.post("/login", async (req, res) => {
  let response = {};
  const { usrName, pass } = req.body;

  try {

    const user = await usrStorage.findUniqUser({ userName: usrName });

    if (!user) {
      throw new loginError("User Not found", "USERNAME");
    }
    if (!UserStore.verifyUser(user.pass, pass)) {
      throw new loginError("Incorrect Password", "PASS");
    }
    req.session.usrId = usrStorage.fromObjectId(user._id);
    response.usrName = usrName;
    res.status(201);

  } catch (err) {
    res.status(400);
    response.ErrMessage = err.message;
    response.ErrorCode = err instanceof loginError ? err.code : 'MISC';
  } finally {
    res.json(response).end();
  }
});

app.post("/signup", async (req, res) => {
  const { email, usrName, pass }  = req.body;

  let response ={};

  try {
    const result = await usrStorage.newUser(usrName, email, pass);
    req.session.usrId = usrStorage.fromObjectId(result.insertedId);
    response.usrName = usrName;
    res.status(201);
  } catch(err) {
    res.status(400);
    response.ErrMessage = err.message;
    response.ErrorCode = err instanceof usrRegisterError ? err.code : 'MISC';
  } finally {
    res.json(response).end();
  }
});

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


// =========================== GraveYard ================

// app.get("/", (req, res) => {
//   if (req.session.usrId) {
//     return res.redirect("/home");
//   }
//   res.sendFile(__dirname + "/my-app/build/register.html");
//   // res.sendFile(__dirname + "/staticTest/register.html");
// });

// app.get("/home", (req, res) => {
//   if (!req.session.usrId) {
//     return res.redirect("/");
//   }
//   res.sendFile(__dirname + "/my-app/build/index.html");
// });