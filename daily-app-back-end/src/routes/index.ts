import CreateUserRouter from "./CreateUserRouter";

import { Router} from "express";

const route = Router();

route.use('./users',CreateUserRouter)