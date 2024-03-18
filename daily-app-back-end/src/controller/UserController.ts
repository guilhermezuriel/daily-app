import { Request, Response } from "express";
import { z } from 'zod'
import { kknex } from "../database";
import { randomUUID } from 'node:crypto';
import { BadRequestError } from "../helpers/api-errors";

const UserController = {
  async createUserController(req: Request, res: Response) {
    try {
      const createUserBodySchema = z.object({
        name: z.string(),
        email: z.string().refine((email) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email ?? ""), 'Invalid email'),
        password: z.string().refine((password) => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password ?? ''), 'Password must have minimum eight characters, at least one uppercase,one lower case, one number and special character'),
      })
      const { name, email, password } = createUserBodySchema.parse(req.body);
      const UserExists = await kknex('users').where('email', email).select('*');
      if (UserExists) {
        return new BadRequestError('O Email já está cadastrado');
      }
      const user = await kknex('users').insert({
        id: randomUUID(),
        name,
        email,
        password,
        accept_rate: null
      })
      return res.status(201).send({ user })
    } catch (err) {
      console.log('createUserContoller >>>', err)
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