import { Request, Response } from "express";
import {z} from 'zod'
import { kknex } from "../database";
import {randomUUID} from 'node:crypto';
import { BadRequestError } from "../helpers/api-errors";

const RefController = {
  //need to test
  async createRefController(req:Request, res: Response){
    try{
      const user = req.user;
      if(!user) return new Error('Unathourized Error');
      //CODE (Validação de tipagem com zod)
      const {name, type, is_Diet} = req.body;
      const date = new Date().toLocaleString('en-GB');
      const ref = await kknex('refs').insert({
        id:randomUUID(),
        user_id: user.id,
        name: name,
        type: type,
        is_Diet: is_Diet,
        created_at: date
      })
      return res.status(201).send(ref)
    }catch(err){
      console.log('postRefController >>>', err)
    }
  },
  async listAllRefs(req:Request, res: Response){
    try{
      const user = req.user
      const refs = await kknex('refs').where('user_id', user.id).select('*');
      return res.send({refs})
    }catch(err){
      console.log('list All Refs >>>>', err)
    }
  },
  //need to test
  async getRefController(req:Request, res: Response){
    try{
      const {id} = req.query;
      const user = req.user;
      const ref = await kknex('refs').where({id:id, user_id:user.id}).select('*')
      if(!ref) return new BadRequestError('Ref does not exist');
      return res.send(ref);
    }catch(err){
      console.log('getRefController >>>>>', err)
    }
  },
  //need to test
  async updateRefController(req: Request, res: Response){
    try{
      const user = req.user
      const {id, ...changes} = req.body;
      const [ref] = await kknex('refs').where({id:id, user_id:user.id}).select('*');
      if(!ref){
        return new BadRequestError('Ref does not exist');
      }
      await kknex('refs').where({id:id, user_id:user.id}).update({

      })
    }catch(err){
      console.log('updateRefController >>>>', err)
    }
  }
}

export default RefController