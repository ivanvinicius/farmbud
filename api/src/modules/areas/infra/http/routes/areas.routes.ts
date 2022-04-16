import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import AreasController from '../controllers/AreasController';

const areasRouter = Router();
const areasController = new AreasController();

areasRouter.use(ensureAuthenticated);
areasRouter.get('/', areasController.index);

areasRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string(),
      size: Joi.number().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
    },
  }),
  areasController.create,
);

areasRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      name: Joi.string().required(),
      description: Joi.string(),
      size: Joi.number().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
    },
  }),
  areasController.update,
);

areasRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  areasController.delete,
);

export default areasRouter;
