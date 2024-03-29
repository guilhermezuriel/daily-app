import { Request, Response } from 'express';
import { z } from 'zod';
import { kknex } from '../database';
import { BadRequestError } from '../helpers/api-errors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const LoginController = {
  //POST
  async loginUserController(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const [user] = await kknex('users').where('email', email).select('*');
      if (!user) return new BadRequestError('Email ou senha inválidos');

      const verifyPassword = await bcrypt.compare(password, user.password);
      if (!verifyPassword)
        return new BadRequestError('Email ou senha inválidos');
      const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? '', {
        expiresIn: '1d',
      });

      res.cookie('userToken', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        secure: true,
      });

      const { password: _, ...userLogin } = user;
      return res.json({ user: userLogin });
    } catch (err) {
      console.log('loginUserController >>>', err);
    }
  },
};
