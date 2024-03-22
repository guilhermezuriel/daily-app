import { Request, Response } from "express";
import { z } from 'zod'
import { kknex } from "../database";
import { BadRequestError } from "../helpers/api-errors";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config'

export const LoginController = {
  async loginUserController(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const [user]= await kknex('users').where('email', email).select('*');
      if (!user) return new BadRequestError('Email ou senha inválidos');

      const verifyPassword = await bcrypt.compare(password, user.password);
      if (!verifyPassword) return new BadRequestError('Email ou senha inválidos')
      const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? '', { expiresIn: "7d" });
      //CODE (STORE TOKEN ON LOCALSTORAGE OR COOKIES)
      const { password: _, ...userLogin } = user;
      return res.json({ user: userLogin, token:token });
    } catch (err) {
      console.log('loginUserController >>>', err)
    }
  },
  

}