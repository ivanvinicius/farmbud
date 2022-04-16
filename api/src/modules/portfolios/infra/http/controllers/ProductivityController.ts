import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProductivityService from '@modules/portfolios/services/productivity/ListProductivityService';

export default class ProductivityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { culture_id } = request.query;

    const listProdutivity = container.resolve(ListProductivityService);

    const produtivity = await listProdutivity.execute({
      provider_id,
      culture_id: String(culture_id),
    });

    return response.json(produtivity);
  }
}
