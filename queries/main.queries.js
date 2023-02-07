import { MainModel } from '../models/main.model.js';

class mainQueries {

    async store(newObject){
        try{
            const query = MainModel.create(newObject);
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
            const query = await MainModel.findAll();
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
            const query = await MainModel.findByPk(id);
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

    async update(id,title,urlimg,percentage,experiencetime) {
        try {
            const query = await MainModel.update({
                title: title,
                urlimg: urlimg,
                percentage: percentage,
                experiencetime: experiencetime
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
            const query = await MainModel.destroy({
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

export const MainQueries = new mainQueries();