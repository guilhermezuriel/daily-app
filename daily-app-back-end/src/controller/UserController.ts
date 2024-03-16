import { Request, Response } from "express";
import {z} from 'zod'
import { kknex } from "../database";
import {randomUUID} from 'node:crypto';

const UserController = { 
  async createUserController(req:Request, res: Response){
    try{
      const createUserBodySchema = z.object({
        name: z.string(),
        email: z.string().refine((email)=>/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email?? ""), 'Invalid email'),
        password: z.string().refine((password)=>/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password??''), 'Password must have minimum eight characters, at least one uppercase,one lower case, one number and special character'),
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

export default UserController