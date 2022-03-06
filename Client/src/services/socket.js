import { io } from "socket.io-client";

// initalization of client websocket
const socket = io("http://localhost:8000", {
  autoConnect: false,
  withCredentials: true,
});

export default socket;
