import express from "express";
import { createServer } from 'http';
import { env } from "process";
import session from 'express-session';
import sessionHandler from 'express-sessions';
import bodyParser from 'body-parser';
import Redis from 'ioredis';
import { Server } from "socket.io";

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

// Middleware
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static(__dirname + '/staticTest'));

app.use(session({
  secret: SECRET,
  cookie: {
    maxAge: 86400000
  },
  resave: false,
  saveUninitialized: false,
  store: new sessionHandler({
    storage: 'redis',
    collection: 'sessions',
    instance: redisClient
  })
}))

// Routes
app.get('/', (req, res) => {
  const sesh = req.session;
  console.log(sesh);
  if (req.session.email) {
    return res.redirect('/home');
  }
  res.sendFile(__dirname + '/staticTest/index2.html');
});

app.post('/login', (req, res) => {
  req.session.email = req.body.email;
  res.redirect('/home');
});

app.get('/home', (req, res) => {
  if (!req.session.email) {
    return res.redirect('/');
  }
  res.sendFile(__dirname + '/staticTest/home.html');
});

// websock handlers
io.on('connection', (socket) => {
  console.log('connected');
  socket.on('chat message', (data) => {
    console.log(data);
  })
})

// start server
httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`Server Listening on ${PORT}`);
})
