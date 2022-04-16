import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListCitiesService from '@modules/addresses/services/ListCitiesService';

export default class CitiesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { state_id } = request.query;

    const listCities = container.resolve(ListCitiesService);

    const cities = await listCities.execute({ parent_id: String(state_id) });

    return response.json(cities);
  }
}
