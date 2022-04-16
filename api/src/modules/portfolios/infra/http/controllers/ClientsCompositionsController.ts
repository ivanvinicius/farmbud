import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderWithAvaibleCompositionService from '@modules/portfolios/services/compositions/ListProviderWithAvaibleCompositionService';
import ListProviderCompositionDetailService from '@modules/portfolios/services/compositions/ListProviderCompositionDetailService';

export default class ClientsCompositionsController {
  public async index(request: Request, response: Response): Promise<Response> {
    let service;
    let responseService;
    const { provider_id, culture_id, productivity } = request.query;

    if (!provider_id) {
      service = container.resolve(ListProviderWithAvaibleCompositionService);

      responseService = await service.execute({
        culture_id: String(culture_id),
        productivity: Number(productivity),
      });
    } else {
      service = container.resolve(ListProviderCompositionDetailService);

      responseService = await service.execute({
        provider_id: String(provider_id),
        culture_id: String(culture_id),
        productivity: Number(productivity),
      });
    }

    return response.json(responseService);
  }
}
