import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateBudgetsService from '@modules/budgets/services/CreateBudgetService';
import ListBudgetsService from '@modules/budgets/services/ListBudgetService';
import ListBudgetDetailService from '@modules/budgets/services/ListBudgetDetailService';

export default class BudgetsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id, productivity, culture_id, area_id } = request.query;
    let service;
    let responseService;

    if (!provider_id || !productivity || !culture_id) {
      service = container.resolve(ListBudgetsService);

      responseService = await service.execute({ user_id: String(user_id) });
    } else {
      service = container.resolve(ListBudgetDetailService);

      responseService = await service.execute({
        user_id: String(user_id),
        provider_id: String(provider_id),
        productivity: Number(productivity),
        culture_id: String(culture_id),
        area_id: String(area_id),
      });
    }

    return response.json(responseService);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id, area_id, season_id, items } = request.body;

    const createBudget = container.resolve(CreateBudgetsService);

    const budgets = await createBudget.execute({
      user_id,
      provider_id,
      area_id,
      season_id,
      items,
    });

    return response.json(budgets);
  }
}
