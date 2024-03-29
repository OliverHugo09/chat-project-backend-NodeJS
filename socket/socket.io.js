/* import { Server } from 'socket.io';
import { Op } from 'sequelize';
import { UserModel } from '../models/user.model.js';
import { MessageModel } from '../models/messages.model.js';

const io = new Server();

export class SocketIo {

    startSocket(http) {
        this.io = new Server(http, { cors: {
                origin: '*', methods: ["GET", "POST"]
        }});

        const users = {};

        this.io.on('connection',  async (socket) => {

            console.log(`New connection ${socket.id}`);

            const userId = socket.handshake.query.userId;

            // Update the user's socket_id in the database
            await UserModel.update({ socket_id: socket.id, online: 1 }, { where: { id: { [Op.eq]: userId } } });

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
            
            //take userId and socketId from user
            socket.on("addUser", (userId) => {
                addUser(userId, socket.id);
                io.emit("getUsers", users);
            });

            //send and get message
            socket.on("sendMessage", ({ senderId, receiverId, text }) => {
                const user = getUser(receiverId);
                io.to(user.socketId).emit("getMessage", {
                senderId,
                text,
                });
            });
 
        });
    }
} */