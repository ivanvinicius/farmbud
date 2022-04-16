import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListCultureService from '@modules/cultures/services/ListCultureService';

export default class CulturesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCultures = container.resolve(ListCultureService);

    const cultures = await listCultures.execute();

    return response.json(cultures);
  }
}
