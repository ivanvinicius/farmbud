import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureIsProvider from '@shared/infra/http/middlewares/ensureIsProvider';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import PortfoliosController from '../controllers/PortfoliosController';

const portfoliosRouter = Router();
const portfoliosController = new PortfoliosController();

portfoliosRouter.use(ensureAuthenticated);
portfoliosRouter.get('/', portfoliosController.index);

portfoliosRouter.post(
  '/',
  ensureIsProvider,
  celebrate({
    [Segments.BODY]: {
      product_id: Joi.string().required(),
      measure_id: Joi.string().required(),
      size: Joi.number().required(),
      price: Joi.number().required(),
    },
  }),

  portfoliosController.create,
);

portfoliosRouter.put(
  '/',
  ensureIsProvider,
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      measure_id: Joi.string().required(),
      size: Joi.number().required(),
      price: Joi.number().required(),
    },
  }),

  portfoliosController.update,
);

portfoliosRouter.delete(
  '/',
  ensureIsProvider,
  celebrate({
    [Segments.BODY]: {
      ids: Joi.array().required(),
    },
  }),
  portfoliosController.delete,
);

export default portfoliosRouter;
