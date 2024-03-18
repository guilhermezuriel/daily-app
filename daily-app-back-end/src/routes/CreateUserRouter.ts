import { Router } from "express";
import { checkSessionIdExists } from '../middleware/checkSessionIdExitst'

import UserController from '../controller/UserController'

const route = Router();

route.post('/create', UserController.createUserController);
// route.post'/login/:id', UserController.getUserController);
route.get('/:id', UserController.getUserController);

export default route;
