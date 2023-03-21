import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { Routes } from '../routes/routes.js'
import { Database } from './database.js';
//import { SocketIo } from '../socket/socket.io.js'
import { Server  } from 'socket.io';
import { UserModel } from '../models/user.model.js';
import { Op } from 'sequelize';

dotenv.config();

class App {
    app = express.application
    http = null;
    routes = new Routes();
    db = new Database();
    //socket = new SocketIo();
    io = new Server(this.http)

    constructor(){
        this.initializeApp()
    }

    async initializeApp() {
        this.app = express();
        this.config();
        this.http = http.createServer(this.app);
        await this.initDatabase();
        this.routes.initRoutes(this.app);
        this.initSocket(this.http);
    }

    config(){
        this.app.use(
            express.urlencoded({
                extended: true
            })
        )
        this.app.use(express.json())
        this.app.use(cors({origin: '*', methods: ["GET", "POST"]}))
    }

    async initDatabase(){
        const conection = await this.db.connection();
        console.log(conection.message)

    }

    async initSocket(){
        this.io = new Server(this.http, { cors: {
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




        });
    }

}

export default new App();


