import CreateUserRouter from './CreateUserRouter';
import CreateLoginRouter from './CreateLoginRouter';
import CreateRefRouter from './CreateRefRouter';
import { verifyJWT } from '../middleware/verifyJWT';
import { Router } from 'express';
import { errorMiddleware } from '../middleware/error';

const routes = Router();

routes.use(errorMiddleware);
routes.use('/login', CreateLoginRouter);
routes.use('/user', CreateUserRouter);
routes.use('/ref', verifyJWT, CreateRefRouter);

export default routes;
