import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import SeasonsController from '../controllers/SeasonsController';

const seasonsRouter = Router();
const seasonsController = new SeasonsController();

seasonsRouter.use(ensureAuthenticated);
seasonsRouter.get('/', seasonsController.index);

seasonsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string(),
      start_at: Joi.required(),
      end_at: Joi.required(),
    },
  }),
  seasonsController.create,
);

seasonsRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      name: Joi.string().required(),
      description: Joi.string(),
      start_at: Joi.required(),
      end_at: Joi.required(),
    },
  }),
  seasonsController.update,
);

seasonsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  seasonsController.delete,
);

export default seasonsRouter;
