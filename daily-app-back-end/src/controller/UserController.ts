import { Request, Response } from "express";
import {z} from 'zod'

const UserController = { 
  async createUserController(req:Request, res: Response){
    try{
      const createUserBodySchema = z.object({
        name: z.string(),
        email: z.string().refine((email)=>/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email?? ""), 'Invalid email'),
        password: z.string().refine((password)=>/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"/g.test(password??''), 'Password must have minimum eight characters, at least one letter,one number and special character'),
      })
      const {name, email, password} = createUserBodySchema.parse(req.body);
    }catch(err){
      console.log('createUserContoller >>>', err)
    }
  },

}

export default UserController