import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CitiesController from '../controllers/CitiesController';

const citiesRouter = Router();
const citiesController = new CitiesController();

citiesRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      state_id: Joi.string().required(),
    },
  }),

  citiesController.index,
);

export default citiesRouter;
