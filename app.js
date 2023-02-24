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

    // Broadcast when a user typing
    socket.on('typing', function(data){
        socket.broadcast.emit('typing',data);
    });

    // Room chat
    socket.on('join', (data) => {
      socket.join(data.room);
      socket.broadcast.to(data.room).emit('user joined');
  });

  socket.on('message', (data) => {
      io.in(data.room).emit('new message', {user: data.user, message: data.message});
  });

});

const port = process.env.PORT || process.env.APP_PORT;

// Start server
App.http.listen(port, () => console.log(`API escuchando en puerto: ${port}`));