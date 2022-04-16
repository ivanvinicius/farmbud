import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProvidersController from '@modules/users/infra/http/controllers/ProvidersController';

const providersRouter = Router();

const providersController = new ProvidersController();

providersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      address_id: Joi.string().uuid().required(),
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  providersController.create,
);

export default providersRouter;
