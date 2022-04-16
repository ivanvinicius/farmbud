import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import BrandsController from '../controllers/BrandsController';

const brandsRouter = Router();
const brandsController = new BrandsController();

brandsRouter.use(ensureAuthenticated);
brandsRouter.get('/', brandsController.index);

export default brandsRouter;
