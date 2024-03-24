import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { kknex } from "../database";

type JwtPayload = {
  id: string
}

export async function verifyJWT(req:Request, res:Response, next:NextFunction){
  const {headers:{cookie}} = req;
  if (!cookie) {
    throw new Error('Unathourized Error');
  }
  const token = cookie.slice(10);
  const {id} = jwt.verify(token,process.env.JWT_PASS ?? '' ) as JwtPayload;
  const [user] = await kknex('users').where('id', id).select('*');
  if(!user){
    return new Error('Not authorized');
  }
  const { password:_ , ...loggedUser } = user;

  req.user = loggedUser

  next()
}