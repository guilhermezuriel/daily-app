import { Router, Request, Response, request } from "express";

import UserController from '../controller/UserController'

const route = Router();

route.post('/', UserController.createUserController);

export default route;