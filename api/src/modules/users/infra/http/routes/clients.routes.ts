import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ClientsController from '@modules/users/infra/http/controllers/ClientsController';

const clientsRouter = Router();

const clientsController = new ClientsController();

clientsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  clientsController.create,
);

export default clientsRouter;
