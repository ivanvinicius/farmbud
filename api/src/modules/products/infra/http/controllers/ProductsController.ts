import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProductService from '@modules/products/services/ListProductService';

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = container.resolve(ListProductService);

    const products = await listProducts.execute();

    return response.json(products);
  }
}
