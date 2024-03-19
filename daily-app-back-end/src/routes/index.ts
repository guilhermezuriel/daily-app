import CreateUserRouter from "./CreateUserRouter";
import CreateLoginRouter from "./CreateLoginRouter";
import { Router} from "express";

const routes = Router();

routes.use('/login', CreateLoginRouter)
routes.use('/user',CreateUserRouter)


export default routes