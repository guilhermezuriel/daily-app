import { Request, Response } from 'express';
import { z } from 'zod';
import { kknex } from '../database';
import { randomUUID } from 'node:crypto';
import { BadRequestError, UnathourizedError } from '../helpers/api-errors';

const RefController = {
  //need to test
  async createRefController(req: Request, res: Response) {
    try {
      const refSchema = z.object({
        name: z.string(),
        type: z.enum(['breakfast', 'lunch', 'dinner']),
        is_Diet: z.boolean(),
      });
      const user = req.user;
      if (!user)
        return new UnathourizedError('O usuário precisa realizar login');
      //CODE (Validação de tipagem com zod)
      const { name, type, is_Diet } = refSchema.parse(req.body);
      const date = new Date().toLocaleString('en-GB');
      const ref = await kknex('refs').insert({
        id: randomUUID(),
        user_id: user.id,
        name: name,
        type: type,
        is_Diet: is_Diet,
        created_at: date,
      });
      return res.status(201).send(ref);
    } catch (err) {
      console.log('postRefController >>>', err);
    }
  },
  async listAllRefs(req: Request, res: Response) {
    try {
      const user = req.user;
      const refs = await kknex('refs').where('user_id', user.id).select('*');
      return res.send({ refs });
    } catch (err) {
      console.log('list All Refs >>>>', err);
    }
  },
  async getRefController(req: Request, res: Response) {
    try {
      const user = req.user;
      const { id } = req.params;
      const ref = await kknex('refs')
        .where({ id: id, user_id: user.id })
        .select('*');
      if (!ref) return new BadRequestError('Refeição não existe');
      return res.send({ ref });
    } catch (err) {
      console.log('getRefController >>>>>', err);
    }
  },
  async updateRefController(req: Request, res: Response) {
    try {
      const user = req.user;
      const ref = req.params;
      const { id, user_id, ...changes } = req.body;
      const [editedRef] = await kknex('refs')
        .where({ id: ref.id, user_id: user.id })
        .select('*');
      if ([editedRef].length < 0) {
        return new BadRequestError('Ref does not exist');
      }
      const attRef = await kknex('refs')
        .where({ id: ref.id, user_id: user.id })
        .update({
          ...changes,
        });
      return res.status(200).send('Refeição atualizada com sucesso');
    } catch (err) {
      console.log('updateRefController >>>>', err);
    }
  },
  async getSameTypeRefs(req: Request, res: Response) {
    const user = req.user;
    const { type } = req.query;
    const filter = await kknex('refs')
      .where({ user_id: user.id, type: type })
      .select('*');
    return res.status(200).send({ filter });
  },
  async deleteRefController(req: Request, res: Response) {
    try {
      const user = req.user;
      const { id } = req.params;
      await kknex('refs').where({ id: id, user_id: user.id }).del();
      return res.status(200).send('Usuário deletado com sucesso');
    } catch (err) {
      console.log('deleteRefController >>> ', err);
    }
  },
};

export default RefController;
