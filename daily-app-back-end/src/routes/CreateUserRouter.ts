import { Router, Request, Response, request } from "express";

import UserController from '../controller/UserController'

const routes = Router();

routes.post('/', UserController.createUserController);

export default routes;