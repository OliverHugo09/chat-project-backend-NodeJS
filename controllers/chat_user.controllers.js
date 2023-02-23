import { ChatUserQueries } from "../queries/chat_user.queries.js";

class ChatUserController {

    async create(req,res) {
        const body = req.body;
        const condition = body.condition;
        const query = await ChatUserQueries.store(body,condition);
        if(query.ok){
            return res.status(200).json({ok: true, data: query.data});
        }else{
            return res.status(403).json({ok: false, message: 'Error on process request'});
        }
    }

    async findByPk(req,res) {
        const body = req.body;
        const condition = body.condition;
        const {chat_user_id} = req.params;
        const query = await ChatUserQueries.findByPk(chat_user_id,condition);
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
        const {chat_user_id} = req.params;
        const query = await ChatUserQueries.update(chat_user_id,condition);
        const queryres = await ChatUserQueries.findByPk(chat_user_id,condition);
        if(query.ok){
            return res.status(200).json({queryres});
        }else{
            return res.status(403).json({ok: false, message: 'No found'});
        }
    }

    async delete(req,res) {
        const body = req.body;
        const condition = body.condition;
        const {chat_user_id} = req.params;
        const query = await ChatUserQueries.delete(chat_user_id,condition);
        if(query.ok){
            return res.status(200).json({ok: true, data: query.data});
        }else{
            return res.status(403).json({ok: false, message: 'No found'});
        }
    }

    async find(req, res) {
        const body = req.body;
        const condition = body.condition;
        const query = await ChatUserQueries.find(condition);
        if(query.ok) {
            return res.status(200).json(query.data);
        } else {
            return res.status(403).json({ok: false, message: 'Error on process request'});
        }
    }
}
export const chatUserController = new ChatUserController();