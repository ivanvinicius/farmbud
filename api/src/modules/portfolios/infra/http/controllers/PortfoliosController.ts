import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListPortfolioService from '@modules/portfolios/services/portfolios/ListPortfolioService';
import CreatePortfolioService from '@modules/portfolios/services/portfolios/CreatePortfolioService';
import UpdatePortfolioService from '@modules/portfolios/services/portfolios/UpdatePortfolioService';
import DeletePortfolioService from '@modules/portfolios/services/portfolios/DeletePortfolioService';

export default class PortfoliosController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;

    const listPortfolios = container.resolve(ListPortfolioService);

    const portfolios = await listPortfolios.execute(provider_id);

    return response.json(portfolios);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { product_id, measure_id, size, price } = request.body;

    const createPortfolio = container.resolve(CreatePortfolioService);

    const portfolio = await createPortfolio.execute({
      provider_id,
      product_id,
      measure_id,
      size,
      price,
    });

    return response.json(portfolio);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id, measure_id, size, price } = request.body;

    const updatePortfolio = container.resolve(UpdatePortfolioService);

    const portfolio = await updatePortfolio.execute({
      id,
      measure_id,
      size,
      price,
    });

    return response.json(portfolio);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { ids } = request.body;

    const deletePortfolio = container.resolve(DeletePortfolioService);

    const portfolio = await deletePortfolio.execute({ ids });

    return response.json(portfolio);
  }
}
