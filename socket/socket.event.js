import App from "./config/config.js";
import { Server } from "socket.io";

const io = new Server(App.http,{
    cors: {
      origin: '*',
    }
  });

io.on("connection", (socket) => {

    console.log(`New connection ${socket.id}`);

    socket.on('chat', function(data){
        io.sockets.emit('chat',data);
    });
    socket.on('typing', function(data){
        io.sockets.emit('typing',data)
    });
});