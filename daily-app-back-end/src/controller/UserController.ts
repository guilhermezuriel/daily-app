import { Request, Response } from "express";
import { z } from 'zod'
import { kknex } from "../database";
import { randomUUID } from 'node:crypto';
import { BadRequestError } from "../helpers/api-errors";
import { User } from "../models/User.model";
import bcrypt from 'bcrypt';
import { validateCreation } from "../helpers/validate-creation";
import jwt from 'jsonwebtoken';

const UserController = {
  async createUserController(req: Request, res: Response) {
    try {
      const { name, email, password }: User = req.body;
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
  async loginUserController(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const [user]: any = await kknex('users').where('email', email).select('*');
      if (!user) return new BadRequestError('Email ou senha inválidos');

      const verifyPassword = await bcrypt.compare(password, user.password);
      if (!verifyPassword) return new BadRequestError('Email ou senha inválidos')
      //Needs to generate token
      return res.status(200).send('Usuário Logado');
    } catch (err) {
      console.log('loginUserController >>>', err)
    }
  },
  async getUserController(req: Request, res: Response) {
    try {
      const getUserParamsSchema = z.object({
        id: z.string().uuid()
      })
      const { id } = getUserParamsSchema.parse(req.params);
      const user = await kknex('users').where('id', id).select('*')
      return res.status(200).send(user)
    } catch (err) {
      console.log('getUserController >>>> ', err)
    }
  },
  async listAllUsersController(req: Request, res: Response) {
    try {
      const user = await kknex('users').select('*')
      return res.send(user)
    } catch (err) {
      console.log(err)
    }
  }

}

export default UserController