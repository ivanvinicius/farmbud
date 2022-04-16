import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import BudgetsController from '../controllers/BudgetsController';

const budgetsRouter = Router();
const budgetsController = new BudgetsController();

budgetsRouter.use(ensureAuthenticated);
budgetsRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      provider_id: Joi.string(),
      productivity: Joi.string(),
      culture_id: Joi.string(),
      area_id: Joi.string(),
    },
  }),

  budgetsController.index,
);

budgetsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().required(),
      area_id: Joi.string().required(),
      season_id: Joi.string().required(),
      items: Joi.array().required(),
    },
  }),
  budgetsController.create,
);

export default budgetsRouter;
