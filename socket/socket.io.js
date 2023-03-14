import { Server } from 'socket.io';
import { Op } from 'sequelize';
const io = new Server();

export class SocketIo {

    startSocket(http) {
        this.io = new Server(http, { cors: {
                origin: '*', methods: ["GET", "POST"]
        }});

        const users = {};

        this.io.on('connection',  (socket) => {

            console.log(`New connection ${socket.id}`);

            // Broadcast when a user typing
            socket.on('typing', () => {
            socket.broadcast.emit('typing', socket.id);
            });

            // Broadcast when a user stop typing
            socket.on('stopTyping', () => {
            socket.broadcast.emit('stopTyping', socket.id);
            });

            // Messages
            socket.on('sendMessage2', (messageInfo)=>{
                socket.broadcast.emit('receiveMessage', messageInfo);
            });



        });
    }
}