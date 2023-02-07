import { request, response } from 'express';
import { UserQueries } from '../queries/user.queries.js';
import { Payload } from '../helpers/payload.js';
import bcrypt from 'bcrypt';

class UserController {

    static payload = new Payload();

    async sayHello(request, response) {
        return response.status(200).json({
            ok: true,
            message: 'Hello'
        });
    }

    async create(req,res) {
        const body = req.body;
        const condition = body.condition;
        const query = await UserQueries.store(body,condition);
        if(query.ok){
            return res.status(200).json({ok: true, data: query.data});
        }else{
            return res.status(403).json({ok: false, message: 'Error on process request'});
        }
    }

    async findByPk(req,res) {
        const body = req.body;
        const condition = body.condition;
        const {id} = req.params;
        const query = await UserQueries.findByPk(id,condition);
        if(query.ok){
            return res.status(200).json(query.data);
        }else{
            return res.status(403).json({ok: false, message: 'No found'});
        }
    }

    async update(req,res) {
        const body = req.body;
        const condition = body.condition;
        const {username,password,socket_id,online,avatar} = req.body;
        const {id} = req.params;
        const query = await UserQueries.update(id,username,password,socket_id,online,avatar,condition);
        const queryres = await UserQueries.findByPk(id,condition);
        if(query.ok){
            return res.status(200).json({queryres});
        }else{
            return res.status(403).json({ok: false, message: 'No found'});
        }
    }

    async delete(req,res) {
        const body = req.body;
        const condition = body.condition;
        const {id} = req.params;
        const query = await UserQueries.delete(id,condition);
        if(query.ok){
            return res.status(200).json({ok: true, data: query.data});
        }else{
            return res.status(403).json({ok: false, message: 'No found'});
        }
    }

    async find(req, res) {
        const body = req.body;
        const condition = body.condition;
        const query = await UserQueries.find(condition);
        if(query.ok) {
            return res.status(200).json(query.data);
        } else {
            return res.status(403).json({ok: false, message: 'Error on process request'});
        }
    }

    async finduser(req, res) {
        const body = req.body; 
        const query = await UserQueries.findOne({
            username: body.username,
            password: body.password
        });
        if(query) {
            return res.status(200).json(query);
        } else {
            return res.status(403).json({ok: false, message: 'Error on process request'});
        }
    }

    async login(req, res) {
        const body = req.body; 
        const query = await UserQueries.findOne({
            username: body.username,
            password: body.password
        });
        try {
            const match = await bcrypt.compare(body.password, query.password );
            if(match){
                try {
                    const token = UserController.payload.createToken(query);
                    return res.status(200).json({
                        query,
                        token
                    }
                    );
                } catch (error) {
                    return res.status(400).json({
                        ok:false,
                        data:error,
                    })
                }
            }else{
                return res.status(400).json({
                    ok:false,
                    data:null,
                    message:'Error password'
                })
            }
        } catch (error) {
            return res.status(400).json({
                ok:false,
                data:error,
                message:'User not found'
            })
        }
    }

}
export const userController = new UserController();