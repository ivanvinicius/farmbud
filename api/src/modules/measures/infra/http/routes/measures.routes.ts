import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import MeasuresController from '../controllers/MeasuresController';

const measuresRouter = Router();
const measuresController = new MeasuresController();

measuresRouter.use(ensureAuthenticated);
measuresRouter.get('/', measuresController.index);

export default measuresRouter;
