import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { Routes } from '../routes/routes.js'
import { Database } from './database.js';
import { SocketIo } from '../socket/socket.io.js'
import { Server  } from 'socket.io';

dotenv.config();

class App {
    app = express.application
    http = null;
    routes = new Routes();
    db = new Database();
    socket = new SocketIo();
    io = null;

    constructor(){
        this.initializeApp()
    }

    async initializeApp() {
        this.app = express();
        this.config();
        this.http = http.createServer(this.app);
        await this.initDatabase();
        this.routes.initRoutes(this.app);
        this.socket.startSocket(this.http)
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
}

export default new App();


