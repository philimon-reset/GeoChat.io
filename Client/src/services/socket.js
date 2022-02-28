import { io } from 'socket.io-client'

const socket = io('http://localhost:8000', {
  autoConnect: false,
  withCredentials: true
});

// socket.onAny((event, ...args) => {
//   console.log(event, args);
// });

export default socket;
