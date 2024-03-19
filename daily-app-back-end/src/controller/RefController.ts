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
      const {name, type, isDiet} = req.body;
      const ref = await kknex('refs').insert({
        id:randomUUID(),
        user_id: user.id,
        name: name,
        type: type,
        isDiet: isDiet,
      })
      return res.status(201).send(ref)
    }catch(err){
      console.log('postRefController >>>', err)
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
  
}

export default RefController