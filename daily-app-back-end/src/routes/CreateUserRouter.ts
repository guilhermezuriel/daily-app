import { Router } from "express";

import UserController from '../controller/UserController'
import { verifyJWT } from "../middleware/verifyJWT";

const route = Router();


route.get('/', UserController.listAllUsersController);
route.post('/create', UserController.createUserController);
route.get('/profile', verifyJWT, UserController.getUserProfileController);


export default route;
