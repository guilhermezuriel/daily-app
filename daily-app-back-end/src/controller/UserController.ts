import { Request, Response } from 'express';
import { z } from 'zod';
import { kknex } from '../database';
import { randomUUID } from 'node:crypto';
import { BadRequestError, UnathourizedError } from '../helpers/api-errors';
import bcrypt from 'bcrypt';

const UserController = {
  //POST
  async createUserController(req: Request, res: Response) {
    try {
      const userSchema = z.object({
        name: z.string(),
        email: z
          .string()
          .refine(
            (email) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email ?? ''),
            new BadRequestError('Email inválido'),
          ),
        password: z
          .string()
          .refine(
            (password) =>
              /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
                password ?? '',
              ),
            new BadRequestError(
              'Password must have minimum eight characters, at least one uppercase,one lower case, one number and special character',
            ),
          ),
      });
      const { name, email, password } = userSchema.parse(req.body);
      const UserExists = await kknex('users').where('email', email).select('*');

      // validateCreation('email', email);
      // validateCreation('password', password);

      if (UserExists.length > 0) {
        const error = new BadRequestError('O Email já está cadastrado');
        return res.status(error.statusCode).send(error.message);
      }
      const passwordHash = await bcrypt.hash(password, 10);
      await kknex('users').insert({
        id: randomUUID(),
        name,
        email,
        password: passwordHash,
      });
      return res.status(201).send('Cadastro realizado com sucesso');
    } catch (err) {
      console.log('createUserContoller >>>', err);
    }
  },
  //GET
  async getUserProfileController(req: Request, res: Response) {
    return res.status(200).send(req.user);
  },
  //DEVELOPMENT: LIST ALL USERS
  async listAllUsersController(req: Request, res: Response) {
    try {
      const users = await kknex('users').select('*');
      return res.send(users);
    } catch (err) {
      console.log(err);
    }
  },
  //DELETE
  async deleteUserController(req: Request, res: Response) {
    try {
      const user = req.user;
      if (!user)
        return new UnathourizedError(
          'A requisição não possui autorização para executar esse serviço',
        );
      await kknex('refs').where('user_id', user.id).del();
      await kknex('users').where('id', user.id).del();
      return res.status(204).send('O usuário foi removido');
    } catch (err) {
      console.log('deleteUserController >>>>', err);
    }
  },
  //GET
  async listAllUserRefs(req: Request, res: Response) {
    try {
      const user = req.user;
      const refs = await kknex('refs').where('user_id', user.id).select('*');
      if (refs.length < 0)
        return new BadRequestError('O usuário não possui refeições');
      return res.send(refs);
    } catch (err) {
      console.log('listAllUserRefs >>>>>', err);
    }
  },
  //GET
  async loadUserMetrics(req: Request, res: Response) {
    try {
      const user = req.user;
      const [{ total }] = await kknex('refs')
        .count('* as total')
        .where('user_id', user.id);
      const [{ onDiet }] = await kknex('refs')
        .count('* as onDiet')
        .where({ user_id: user.id, is_Diet: true });
      const [{ notDiet }] = await kknex('refs')
        .count('* as notDiet')
        .where({ user_id: user.id, is_Diet: false });
      const diet_rate = Number(onDiet) / Number(total);
      return res.status(200).send({
        total,
        onDiet,
        notDiet,
        diet_rate,
      });
    } catch (err) {
      console.log('loadUserMetrics >>>', err);
    }
  },
  //GET
  async logoutUserController(req: Request, res: Response) {
    try {
      res.clearCookie('userToken', { secure: true, httpOnly: true });
      return res.send('O token foi');
    } catch (err) {
      console.log('logoutUserCOntroller >>>>>', err);
    }
  },
};

export default UserController;
