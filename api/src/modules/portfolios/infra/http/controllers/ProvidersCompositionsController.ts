import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProviderCompositionsService from '@modules/portfolios/services/compositions/CreateProviderCompositionService';
import ListProviderCompositionDetailService from '@modules/portfolios/services/compositions/ListProviderCompositionDetailService';
import DeleteProviderCompositionService from '@modules/portfolios/services/compositions/DeleteProviderCompositionService';
import ListProviderCompositionService from '@modules/portfolios/services/compositions/ListProviderCompositionService';

export default class ProvidersCompositionsController {
  public async index(request: Request, response: Response): Promise<Response> {
    let service;
    let responseService;
    const provider_id = request.user.id;
    const { culture_id, productivity } = request.query;

    if (!culture_id || !productivity) {
      service = container.resolve(ListProviderCompositionService);

      responseService = await service.execute({ provider_id });
    } else {
      service = container.resolve(ListProviderCompositionDetailService);

      responseService = await service.execute({
        provider_id,
        culture_id: String(culture_id),
        productivity: Number(productivity),
      });
    }

    return response.json(responseService);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { culture_id, productivity, items } = request.body;

    const createProviderComposition = container.resolve(
      CreateProviderCompositionsService,
    );

    const compositions = await createProviderComposition.execute({
      provider_id,
      culture_id,
      productivity,
      items,
    });

    return response.json(compositions);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { culture_id, productivity } = request.query;

    const deleteComposition = container.resolve(
      DeleteProviderCompositionService,
    );

    const serviceResponse = await deleteComposition.execute({
      provider_id,
      culture_id: String(culture_id),
      productivity: Number(productivity),
    });

    return response.json(serviceResponse);
  }
}
