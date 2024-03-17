import { Router, Request, Response, request } from "express";

import RefController from '../controller/RefController'

const route = Router();

route.post('/', RefController.createRefController);

export default route;