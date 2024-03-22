import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { kknex } from "../database";

type JwtPayload = {
  id: string
}

export async function verifyJWT(req:Request, res:Response, next:NextFunction){
  //Need to TEST
  const  authorization  = req.cookies;
  if (!authorization) {
    throw new Error('Unathourized Error');
  }
  //Validating the token
  const token = authorization.token;
  const {id} = jwt.verify(token,process.env.JWT_PASS ?? '' ) as JwtPayload;
  const [user] = await kknex('users').where('id', id).select('*');
  if(!user){
    return new Error('Not authorized');
  }
  const { password:_ , ...loggedUser } = user;

  req.user = loggedUser

  next()
}