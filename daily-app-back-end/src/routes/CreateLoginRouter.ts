import { Router } from "express";

import { LoginController } from "../controller/LoginController";
import { verifyJWT } from "../middleware/verifyJWT";

const route = Router();

route.post('/', LoginController.loginUserController);

export default route;