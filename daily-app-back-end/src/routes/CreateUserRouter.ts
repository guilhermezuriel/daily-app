import { Router } from "express";
import { checkSessionIdExists } from '../middleware/checkSessionIdExitst'

import UserController from '../controller/UserController'

const route = Router();

route.post('/create', UserController.createUserController);
route.get('/', UserController.listAllUsersController);
route.get('/profile', UserController.getUserProfileController);
route.post('/login', UserController.loginUserController);

export default route;
