import { UserModel } from '../models/user.model.js';
import bcrypt from 'bcrypt';

class userQueries {

    async store(user){
        try{
            user.password = await bcrypt.hash(user.password,8);
            const query = await UserModel.create(user);
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
            const query = await UserModel.findAll();
            if(query){
                return{ok: true, data: query};
            }
        } catch(e){
            console.log('Error al ejecutar query', e);
            return {ok: false, data: null};
        }
    }

    async findOne(condition) {
        try {
            const query = await UserModel.findOne({where:{username:condition.username}});
            if(query){
                return query;
            }
        } catch (e) {
            console.log('Error al ejecutar query', e);
            return {ok: false, data: null};
        }
    }

    async findUser(condition) {
        try {
            const query = await UserModel.findOne({where:{username:condition.username}});
            if(query){
                return query;
            }
        } catch (e) {
            console.log('Error al ejecutar query', e);
            return {ok: false, data: null};
        }
    }

    async findByPk(id) {
        try {
            const query = await UserModel.findByPk(id);
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

    async update(id, username, password) {
        try {
            const query = await UserModel.update({
                username: username,
                password: password
            }, {
                where:{
                    id : id
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

    async delete(id) {
        try {
            const query = await UserModel.destroy({
                where: {
                  id: id
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

export const UserQueries = new userQueries();