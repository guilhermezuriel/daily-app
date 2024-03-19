import { Router, Request, Response, request } from "express";

import RefController from '../controller/RefController'
import { verifyJWT } from "../middleware/verifyJWT";

const route = Router();

route.post('/', RefController.createRefController);
route.get('/:id', RefController.getRefController)
route.put('/:id/edit', RefController.updateRefController)

export default route;