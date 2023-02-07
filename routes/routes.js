import express from "express";

// Controllers imports
import { userController } from '../controllers/user.controllers.js';
import { aboutmeController } from "../controllers/aboutme.controllers.js";
import { mediaController } from "../controllers/media.controllers.js";
import { mainController } from "../controllers/main.controllers.js";

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

        //Aboutme (Listar, Crear, Mostrar, Update, Delete)
        //app.route('/aboutme', aboutmeController.find).get([validateToken.validateJWT], aboutmeController.find);
        app.get('/aboutme', aboutmeController.find);
        app.route('/aboutme', aboutmeController.create).post([validateToken.validateJWT], aboutmeController.create);
        app.route('/aboutme/:id', aboutmeController.findByPk).get([validateToken.validateJWT], aboutmeController.findByPk);
        app.route('/aboutme/:id', aboutmeController.update).put([validateToken.validateJWT], aboutmeController.update);
        app.route('/aboutme/:id', aboutmeController.delete).delete([validateToken.validateJWT], aboutmeController.delete);
        
        //Media (Listar, Crear, Mostrar, Update, Delete)
        //app.route('/media', mediaController.find).get([validateToken.validateJWT], mediaController.find);
        app.get('/media', mediaController.find);
        app.route('/media', mediaController.create).post([validateToken.validateJWT], mediaController.create);
        app.route('/media/:id', mediaController.findByPk).get([validateToken.validateJWT], mediaController.findByPk);
        app.route('/media/:id', mediaController.update).put([validateToken.validateJWT], mediaController.update);
        app.route('/media/:id', mediaController.delete).delete([validateToken.validateJWT], mediaController.delete);

        //Main (Listar, Crear, Mostrar, Update, Delete)
        app.get('/main', mainController.find);
        app.route('/main', mainController.create).post([validateToken.validateJWT], mainController.create);
        app.route('/main/:id', mainController.findByPk).get([validateToken.validateJWT], mainController.findByPk);
        app.route('/main/:id', mainController.update).put([validateToken.validateJWT], mainController.update);
        app.route('/main/:id', mainController.delete).delete([validateToken.validateJWT], mainController.delete);

    }
}