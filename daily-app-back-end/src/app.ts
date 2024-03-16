import express from 'express';
import { Router, Request, Response } from 'express';
import { kknex } from './database';


export const app = express();

app.use(express.json())
