import { request, response } from 'express';
import { MainQueries } from '../queries/main.queries.js';
import { Payload } from '../helpers/payload.js';

class MainController {

    static payload = new Payload();

    async create(req,res) {
        const body = req.body;
        const condition = body.condition;
        const query = await MainQueries.store(body,condition);
        if(query.ok){
            return res.status(200).json({ok: true, data: query.data});
        }else{
            return res.status(403).json({ok: false, message: 'Error on process request'});
        }
    }

    async find(req, res) {
        const body = req.body;
        const condition = body.condition;
        const query = await MainQueries.find();
        if(query.ok) {
            return res.status(200).json(query.data);
        } else {
            return res.status(403).json({ok: false, message: 'Error on process request'});
        }
    }

    async findByPk(req,res) {
        const body = req.body;
        const condition = body.condition;
        const {id} = req.params;
        const query = await MainQueries.findByPk(id,condition);
        if(query.ok){
            return res.status(200).json(query.data);
        }else{
            return res.status(403).json({ok: false, message: 'No found'});
        }
    }

    async update(req,res) {
        const body = req.body;
        const condition = body.condition;
        const {title,urlimg,percentage,experiencetime} = req.body;
        const {id} = req.params;
        const query = await MainQueries.update(id,title,urlimg,percentage,experiencetime,condition);
        const queryres = await MainQueries.findByPk(id,condition);
        if(query.ok){
            return res.status(200).json(queryres);
        }else{
            return res.status(403).json({ok: false, message: 'No found'});
        }
    }

    async delete(req,res) {
        const body = req.body;
        const condition = body.condition;
        const {id} = req.params;
        const query = await MainQueries.delete(id,condition);
        if(query.ok){
            return res.status(200).json({ok: true, data: query.data});
        }else{
            return res.status(403).json({ok: false, message: 'No found'});
        }
    }

}
export const mainController = new MainController();