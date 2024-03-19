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
      //Importar novamente biblioteca ZOD -> LEMBRAR
      const { name, email, password }: UserCreate = req.body;
      const UserExists = await kknex('users').where('email', email).select('*');

      validateCreation('email', email);
      validateCreation('password', password);

      if (UserExists.length > 0) {
        const error = new BadRequestError('O Email já está cadastrado')
        return res.status(error.statusCode).send(error.message);
      }
      const passwordHash = await bcrypt.hash(password, 10);
      await kknex('users').insert({
        id: randomUUID(),
        name,
        email,
        password: passwordHash,
        accept_rate: null
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
      if(!user)return new Error('Unathourized Error');
      //NEED TO TEST QUERY ---- DELETE USER AND HIS REFS
      await kknex('users').where('id', user.id).join('users','users.id','refs.user_id').del()
    }catch(err){
      console.log('deleteUserController >>>>', err)
    }
  }

}

export default UserController