import { ChatRoomQueries } from '../queries/chat_room.queries.js';

class ChatRoomController {

    async getChatRoomByUsers(req, res) {
        const { id_usuario_1, id_usuario_2 } = req.params;
        const chatroom = await ChatRoomQueries.getChatRoomByUsers(id_usuario_1, id_usuario_2);
        if (chatroom) {
          return res.status(200).json(chatroom);
        } else {
          return res.status(404).json({ message: 'Chatroom not found' });
        }
      }

      async create(req, res) {
        const { id_usuario_1, id_usuario_2 } = req.body;
      
        const existingChatroom = await ChatRoomQueries.getChatRoomByUsers(id_usuario_1, id_usuario_2);
      
        if (existingChatroom) {
          return res.status(200).json(existingChatroom);
        } else {
          const newChatroom = await ChatRoomQueries.store({ id_usuario_1, id_usuario_2 });
      
          if (newChatroom.ok) {
            return res.status(201).json(newChatroom.data);
          } else {
            return res.status(500).json({ message: 'Error creating chatroom' });
          }
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