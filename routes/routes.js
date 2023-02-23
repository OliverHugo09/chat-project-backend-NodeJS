import express from "express";

// Controllers imports
import { userController } from '../controllers/user.controllers.js';
import { chatRoomController } from '../controllers/chat_room.controllers.js';
import { chatUserController } from '../controllers/chat_user.controllers.js';
import { messageController } from '../controllers/messages.controllers.js';

// Token validate
import { validateToken } from "../middlewares/acessToken.middleware.js";

export class Routes {
    /**
     * @param app
     */
    initRoutes(app = express.application) {
        app.get('/', (req, res) => {
            res.send('hola mundo');
        });

        //Usuarios (Listar, Crear, Mostrar, Update, Delete)
        //app.route('/users', userController.find).get([validateToken.validateJWT], userController.find);
        app.post('/users', userController.create);
        app.get('/users', userController.find);
        app.post('/usersname', userController.finduser);
        app.route('/users/:id', userController.findByPk).get([validateToken.validateJWT], userController.findByPk);
        app.route('/users/:id', userController.update).put([validateToken.validateJWT], userController.update);
        app.route('/users/:id', userController.delete).delete([validateToken.validateJWT], userController.delete);

        app.post('/login', userController.login);

        //ChatRoom (Listar, Crear, Mostrar, Update, Delete)
        app.get('/chatrooms', chatRoomController.find);
        app.route('/chatrooms', chatRoomController.create).post([validateToken.validateJWT], chatRoomController.create);
        app.route('/chatrooms/:id', chatRoomController.findByPk).get([validateToken.validateJWT], chatRoomController.findByPk);
        app.route('/chatrooms/:id', chatRoomController.update).put([validateToken.validateJWT], chatRoomController.update);
        app.route('/chatrooms/:id', chatRoomController.delete).delete([validateToken.validateJWT], chatRoomController.delete);

        //ChatUser (Listar, Crear, Mostrar, Update, Delete)
        app.get('/chatusers', chatUserController.find);
        app.route('/chatusers', chatUserController.create).post([validateToken.validateJWT], chatUserController.create);
        app.get('/chatusers/:id', chatUserController.findByPk);
        app.route('/chatusers/:id', chatUserController.update).put([validateToken.validateJWT], chatUserController.update);
        app.route('/chatusers/:id', chatUserController.delete).delete([validateToken.validateJWT], chatUserController.delete);

        //Message (Listar, Crear, Mostrar, Update, Delete)
        app.get('/messages', messageController.find);
        app.route('/messages', messageController.create).post([validateToken.validateJWT], messageController.create);
        app.route('/messages/:id', messageController.findByPk).get([validateToken.validateJWT], messageController.findByPk);
        app.route('/messages/:id', messageController.update).put([validateToken.validateJWT], messageController.update);
        app.route('/messages/:id', messageController.delete).delete([validateToken.validateJWT], messageController.delete);

        

    }
}