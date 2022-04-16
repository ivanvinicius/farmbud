import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListCategoriesService from '@modules/categories/services/ListCategoriesService';

export default class CategoriesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCategories = container.resolve(ListCategoriesService);

    const categories = await listCategories.execute();

    return response.json(categories);
  }
}
