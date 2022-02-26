// express imports
import express, { Router } from 'express';
import session from "express-session";
import sessionHandler from "express-sessions";
import bodyParser from "body-parser";
import cors from 'cors';

// redis
import Redis from "ioredis";

// env
import { env } from "process";

// Controllers
import AuthController from '../controllers/AuthController';
import UserController from '../controllers/UserController';

// ENV vars
const SECRET = env.chatAppSecret || "IHAVENOSECRETS";

// router
const router = Router();

// MiddleWare
const redisClient = new Redis();
router.use(express.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

export const session = session({
  secret: SECRET,
  cookie: {
    maxAge: 86400000
  },
  resave: false,
  saveUninitialized: false,
  store: new sessionHandler({
    storage: "redis",
    collection: "sessions",
    instance: redisClient,
  }),
});

router.use(session);

// Routes
router.get("/isIn", AuthController.isIn);
router.get('/logout', AuthController.logout);
router.post("/login", AuthController.login);
router.post("/signup", UserController.newUser);

export default router;
