import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import CulturesController from '../controllers/CulturesController';

const culturesRouter = Router();
const culturesController = new CulturesController();

culturesRouter.use(ensureAuthenticated);
culturesRouter.get('/', culturesController.index);

export default culturesRouter;
