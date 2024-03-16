import express from 'express';
import { Router, Request, Response } from 'express';
import { kknex } from './database';

export const app = express();

const route = Router();

app.use(express.json())

route.get('/',async(req:Request, res: Response)=>{
  const test =  await kknex('sqlite_schema').select('*')
  return res.send(test)
})

app.use(route)

