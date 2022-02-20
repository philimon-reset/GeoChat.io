// server imports
import express from "express";
import session from "express-session";
import sessionHandler from "express-sessions";
import bodyParser from "body-parser";
import { createServer } from "http";

// sock imports
import { Server } from "socket.io";

// env
import { env } from "process";

// storage imports
import Redis from "ioredis";
import UserStore from "./Engines/StorageEngine/UserStore";

// error import
import { usrRegisterError } from "./Engines/errors";

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

app.use(bodyParser.urlencoded({ extended: true }));

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
app.get("/", (req, res) => {
  if (req.session.usrId) {
    return res.redirect("/home");
  }
  res.sendFile(__dirname + "/staticTest/register.html");
});

app.get("/home", (req, res) => {
  if (!req.session.usrId) {
    return res.redirect("/");
  }
  res.sendFile(__dirname + "/staticTest/home.html");
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/staticTest/login.html');
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  return res.redirect('/login');
});

app.post("/login", async (req, res) => {
  try {
    const user = await usrStorage.findUniqUser({ userName: req.body.usrName });
    // console.log(user);
    if (UserStore.verifyUser(user, req.body.pass)) {
      req.session.usrId = usrStorage.fromObjectId(user._id);
      return res.redirect('/home');
    } else{
      throw new Error("Login error");
    }
  } catch (err) {
    console.log(err);
    return res.redirect('/login');
  }
});

app.post("/signup", async (req, res) => {
  const { email, usrName, pass }  = req.body;

  try {
    const result = await usrStorage.newUser(usrName, email, pass);
    // console.log(result);
    req.session.usrId = usrStorage.fromObjectId(result.insertedId);
    return res.redirect('/home');
  } catch(err) {
    // detailed error handling, probably useful for frontend
    if (err instanceof usrRegisterError) {
      if (err.code == 'USERNAME') {
        console.log(err);
      }
      if (err.code == 'EMAIL') {
        console.log(err);
      }
    } else {
      console.log(err);
    }
    return res.redirect('/');
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
