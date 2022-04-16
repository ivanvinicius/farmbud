import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ClientsCompositionsController from '../controllers/ClientsCompositionsController';

const clientsCompositionsRouter = Router();
const clientsCompositionsController = new ClientsCompositionsController();

clientsCompositionsRouter.use(ensureAuthenticated);
clientsCompositionsRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      provider_id: Joi.string(),
      culture_id: Joi.string().required(),
      productivity: Joi.number().required(),
    },
  }),
  clientsCompositionsController.index,
);

export default clientsCompositionsRouter;
