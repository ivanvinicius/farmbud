import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ProductivityController from '../controllers/ProductivityController';

const productivityRouter = Router();
const productivityController = new ProductivityController();

productivityRouter.use(ensureAuthenticated);

productivityRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      culture_id: Joi.string(),
    },
  }),
  productivityController.index,
);

export default productivityRouter;
