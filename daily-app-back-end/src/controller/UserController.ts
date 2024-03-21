import { Request, Response } from "express";
import { z } from 'zod'
import { kknex } from "../database";
import { randomUUID } from 'node:crypto';
import { BadRequestError } from "../helpers/api-errors";
import { UserCreate} from "../models/User.model";
import bcrypt from 'bcrypt';
import { validateCreation } from "../helpers/validate-creation";
import jwt from 'jsonwebtoken';

const UserController = {
  //Create User
  async createUserController(req: Request, res: Response) {
    try {
      const userSchema = z.object({
        name: z.string(),
        email: z.string().refine((email)=>/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email??""), new BadRequestError('Email inválido')),
        password: z.string().refine((password)=> /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password??""),new BadRequestError('Password must have minimum eight characters, at least one uppercase,one lower case, one number and special character'))
      })
      const { name, email, password } = userSchema.parse(req.body);
      const UserExists = await kknex('users').where('email', email).select('*');

     // validateCreation('email', email);
     // validateCreation('password', password);

      if (UserExists.length > 0) {
        const error = new BadRequestError('O Email já está cadastrado')
        return res.status(error.statusCode).send(error.message);
      }
      const passwordHash = await bcrypt.hash(password, 10);
      await kknex('users').insert({
        id: randomUUID(),
        name,
        email,
        password: passwordHash
      })
      return res.status(201).send('Cadastro realizado com sucesso')
    } catch (err) {
      console.log('createUserContoller >>>', err)
    }
  },
  //Get User Profile
  async getUserProfileController(req: Request, res: Response) {
    return res.status(200).send(req.user)
  },
  //DEVELOPMENT: LIST ALL USERS
  async listAllUsersController(req: Request, res: Response) {
    try {
      const user = await kknex('users').select('*')
      return res.send(user)
    } catch (err) {
      console.log(err)
    }
  },
  async deleteUserController(req:Request, res:Response){
    try{
      const user = req.user;
      if(!user) return new Error('Unathourized Error');
      //NEED TO TEST QUERY ---- DELETE USER AND HIS REFS
      await kknex('refs').where('user_id', user.id).del()
      await kknex('users').where('id', user.id).del()
      return res.send('O usuário foi removido')
    }catch(err){
      console.log('deleteUserController >>>>', err)
    }
  },
  //Need to test
  async listAllUserRefs(req: Request, res: Response){
    try{
      const user = req.user;
      const refs = await kknex('refs').where('user_id', user.id).select('*');
      return res.send(refs)
    }catch(err){
      console.log('listAllUserRefs >>>>>', err)
    }
  },
  async loadUserMetrics(req:Request, res: Response){
    try{
      const user = req.user;
      const [total] = await kknex('refs').count('id').where('user_id', user.id);
      const [onDiet] = await kknex('refs').count({is_Diet:true}).where('user_id', user.id);
      const onDiet_rate = 0;
    }catch(err){
      console.log('loadUserMetrics >>>', err)
    }
  }
}

export default UserController