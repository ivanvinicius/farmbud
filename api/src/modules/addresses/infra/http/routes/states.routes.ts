import { Router } from 'express';

import StatesController from '../controllers/StatesController';

const statesRouter = Router();
const statesController = new StatesController();

statesRouter.get('/', statesController.index);

export default statesRouter;
