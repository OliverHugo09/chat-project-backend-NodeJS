import { ChatRoomQueries } from '../queries/chat_room.queries.js';

class ChatRoomController {

    async create(req,res) {
        const body = req.body;
        const condition = body.condition;
        const query = await ChatRoomQueries.store(body,condition);
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
        const query = await ChatRoomQueries.findByPk(id,condition);
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
        const {chat_id} = req.params;
        const query = await ChatRoomQueries.update(chat_id,chat_name,condition);
        const queryres = await ChatRoomQueries.findByPk(chat_id,condition);
        if(query.ok){
            return res.status(200).json({queryres});
        }else{
            return res.status(403).json({ok: false, message: 'No found'});
        }
    }

    async delete(req,res) {
        const body = req.body;
        const condition = body.condition;
        const {chat_id} = req.params;
        const query = await ChatRoomQueries.delete(chat_id,condition);
        if(query.ok){
            return res.status(200).json({ok: true, data: query.data});
        }else{
            return res.status(403).json({ok: false, message: 'No found'});
        }
    }

    async find(req, res) {
        const body = req.body;
        const condition = body.condition;
        const query = await ChatRoomQueries.find(condition);
        if(query.ok) {
            return res.status(200).json(query.data);
        } else {
            return res.status(403).json({ok: false, message: 'Error on process request'});
        }
    }
}
export const chatRoomController = new ChatRoomController();