import CreateUserRouter from "./CreateUserRouter";

import { Router} from "express";

const routes = Router();

routes.use('/users',CreateUserRouter)

export default routes