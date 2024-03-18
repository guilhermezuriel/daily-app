import CreateUserRouter from "./CreateUserRouter";
import UserController from "../controller/UserController";
import { Router} from "express";

const routes = Router();

routes.use('/users',CreateUserRouter)


export default routes