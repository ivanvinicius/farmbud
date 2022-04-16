import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListBrandService from '@modules/brands/services/ListBrandService';

export default class BrandsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listBrands = container.resolve(ListBrandService);

    const brands = await listBrands.execute();

    return response.json(brands);
  }
}
