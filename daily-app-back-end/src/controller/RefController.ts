import { Request, Response } from "express";
import {z} from 'zod'
import { kknex } from "../database";
import {randomUUID} from 'node:crypto';

const RefController = { 
  async createRefController(req:Request, res: Response){
    try{
      const createRefBodySchema = z.object({
        
      })
      const {name, email, password} = createUserBodySchema.parse(req.body);
      const user = await kknex('users').insert({
        id:randomUUID(),
        name,
        email,
        password,
        accept_rate: null
      })
      return res.status(201).send(user)
    }catch(err){
      console.log('createUserContoller >>>', err)
    }
  },

}

export default RefController