import { MessageModel } from "../models/messages.model.js";
import { MessageQueries } from "../queries/messages.queries.js";

class MessageController {

    async getMessagesByChatroomId(req, res) {
        const body = req.body; 
        const query = await MessageQueries.findAll({
            chatRoomId: body.chatRoomId,
        });
        if(query) {
            return res.status(200).json(query);
        } else {
            return res.status(403).json({ok: false, message: 'Error on process request'});
        }
    }

    async create(req,res) {
        const body = req.body;
        const condition = body.condition;
        const query = await MessageQueries.store(body,condition);
        if(query.ok){
            return res.status(200).json({ok: true, data: query.data});
        }else{
            return res.status(403).json({ok: false, message: 'Error on process request'});
        }
    }

    async findByPk(req,res) {
        const body = req.body;
        const condition = body.condition;
        const {message_id} = req.params;
        const query = await MessageQueries.findByPk(message_id,condition);
        if(query.ok){
            return res.status(200).json(query.data);
        }else{
            return res.status(403).json({ok: false, message: 'No found'});
        }
    }

    async update(req,res) {
        const body = req.body;
        const condition = body.condition;
        const {} = req.body;
        const {message_id} = req.params;
        const query = await MessageQueries.update(message_id,chat_name,condition);
        const queryres = await MessageQueries.findByPk(message_id,condition);
        if(query.ok){
            return res.status(200).json({queryres});
        }else{
            return res.status(403).json({ok: false, message: 'No found'});
        }
    }

    async delete(req,res) {
        const body = req.body;
        const condition = body.condition;
        const {message_id} = req.params;
        const query = await MessageQueries.delete(message_id,condition);
        if(query.ok){
            return res.status(200).json({ok: true, data: query.data});
        }else{
            return res.status(403).json({ok: false, message: 'No found'});
        }
    }

    async find(req, res) {
        const body = req.body;
        const condition = body.condition;
        const query = await MessageQueries.find(condition);
        if(query.ok) {
            return res.status(200).json(query.data);
        } else {
            return res.status(403).json({ok: false, message: 'Error on process request'});
        }
    }
}
export const messageController = new MessageController();