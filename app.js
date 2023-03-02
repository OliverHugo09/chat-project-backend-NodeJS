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
        socket.emit('chat',data);
    });

    // Broadcast when a user typing
    socket.on('typing', () => {
      socket.broadcast.emit('typing', socket.id);
    });

    // Broadcast when a user stop typing
    socket.on('stopTyping', () => {
      socket.broadcast.emit('stopTyping', socket.id);
    });

    // Room chat
    socket.on('join', (data) => {
      socket.join(data.room);
      socket.broadcast.to(data.room).emit('user joined');
  });

  socket.on('message', (data) => {
      io.in(data.room).emit('new message', {user: data.user, message: data.message});
  });

  // Messages
  socket.on('sendMessage2', (messageInfo)=>{
    console.log(messageInfo.messageType);
    socket.broadcast.emit('receiveMessage', messageInfo);
    console.log(messageInfo.messageType);
  });

});

const port = process.env.PORT || process.env.APP_PORT;

// Start server
App.http.listen(port, () => console.log(`API escuchando en puerto: ${port}`));