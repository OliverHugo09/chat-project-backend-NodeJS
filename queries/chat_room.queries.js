import { ChatRoomModel } from "../models/chat_room.model.js";
import { Op } from "sequelize";

class chatRoomQueries {

    async getChatRoomByUsers(id_usuario_1, id_usuario_2) {
        const chatroom = await ChatRoomModel.findOne({
          where: {
            [Op.or]: [
              {
                id_usuario_1: id_usuario_1,
                id_usuario_2: id_usuario_2,
              },
              {
                id_usuario_1: id_usuario_2,
                id_usuario_2: id_usuario_1,
              },
            ],
          },
        });
        return chatroom;
    }

    async store(newObject){
        try{
            const query = ChatRoomModel.create(newObject);
            if(query){
                return {ok: true, data:query};
            }
        }catch (e){
            console.log('Error al ejecutar query' , e);
            return {ok: false, date:null}
        }
    }

    async find() {
        try{
            const query = await ChatRoomModel.findAll();
            if(query){
                return{ok: true, data: query};
            }
        } catch(e){
            console.log('Error al ejecutar query', e);
            return {ok: false, data: null};
        }
    }

    async findByPk(id) {
        try {
            const query = await ChatRoomModel.findByPk(id,{include:"messages"});
            if(query){
                return {ok: true, data: query};
            }else{
                return {ok: false, data: null};
            }
        } catch (e) {
            console.log('Error al ejecutar query', e);
            return {ok: false, data: null};
        }
    }

    async update(chat_id, chat_name) {
        try {
            const query = await ChatRoomModel.update({
                chat_name: chat_name,
                include:"chat_users"
            }, {
                where:{
                    chat_id : chat_id
                }
            })
            if(query){
                return {ok: true, data: query};
            }else{
                return {ok: false, data: null};
            }
        } catch (e) {
            console.log('Error al ejecutar query', e);
            return {ok: false, data: null};
        }
    }

    async delete(chat_id) {
        try {
            const query = await ChatRoomModel.destroy({
                where: {
                    chat_id : chat_id
                }
              })
            if(query){
                return {ok: true, data: query};
            }else{
                return {ok: false, data: null};
            }
        } catch (e) {
            console.log('Error al ejecutar query', e);
            return {ok: false, data: null};
        }
    }

}

export const ChatRoomQueries = new chatRoomQueries();