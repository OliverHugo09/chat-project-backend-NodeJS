import { request, response } from 'express';
import { AboutmeQueries } from '../queries/aboutme.queries.js';
import { Payload } from '../helpers/payload.js';

class AboutmeController {

    static payload = new Payload();

    async create(req,res) {
        const body = req.body;
        const condition = body.condition;
        const query = await AboutmeQueries.store(body,condition);
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
        const query = await AboutmeQueries.findByPk(id,condition);
        if(query.ok){
            return res.status(200).json(query.data);
        }else{
            return res.status(403).json({ok: false, message: 'No found'});
        }
    }

    async update(req,res) {
        const body = req.body;
        const condition = body.condition;
        const {title,urlimg,descripcion,urlsite} = req.body;
        const {id} = req.params;
        const query = await AboutmeQueries.update(id,title,urlimg,descripcion,urlsite,condition);
        const query2 = await AboutmeQueries.findByPk(id,condition);
        if(query.ok){
            return res.status(200).json({query2});
        }else{
            return res.status(403).json({ok: false, message: 'No found'});
        }
    }

    async delete(req,res) {
        const body = req.body;
        const condition = body.condition;
        const {id} = req.params;
        const query = await AboutmeQueries.delete(id,condition);
        if(query.ok){
            return res.status(200).json({ok: true, data: query.data});
        }else{
            return res.status(403).json({ok: false, message: 'No found'});
        }
    }

    async find(req, res) {
        const body = req.body;
        const condition = body.condition;
        const query = await AboutmeQueries.find(condition);
        if(query.ok) {
            return res.status(200).json(query.data);
        } else {
            return res.status(403).json({ok: false, message: 'Error on process request'});
        }
    }

    async login(req, res) {
        const body = req.body;
        
        const query = await AboutmeQueries.findOne({
            username: body.username,
            password: body.password
        });
        if(query.ok){
            try{
            const token = AboutmeController.payload.createToken(query.data);
            return res.status(200).send({
                ok: true,
                token: token,
                data: query.data
            });
        } catch(e) {
            console.log('Error on jwt sign', e)
            return res.status(400).send({
                ok: false,
                data: null
            });
        }
        }else{
            return res.status(400).send({
                ok: false,
                data: null
            });
        }
    }

}
export const aboutmeController = new AboutmeController();