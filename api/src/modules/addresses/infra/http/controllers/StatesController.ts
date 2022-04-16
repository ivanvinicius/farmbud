import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListStatesService from '@modules/addresses/services/ListStatesService';

export default class StatesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listStates = container.resolve(ListStatesService);

    const states = await listStates.execute();

    return response.json(states);
  }
}
