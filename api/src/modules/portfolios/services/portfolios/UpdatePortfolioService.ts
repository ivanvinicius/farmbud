import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Portfolio from '../../infra/typeorm/entities/Portfolio';
import IPortfoliosRepository from '../../repositories/IPortfoliosRepository';

interface IRequest {
  id: string;
  measure_id: string;
  size: number;
  price: number;
}

@injectable()
export default class UpdatePortfolioService {
  constructor(
    @inject('PortfoliosRepository')
    private portfoliosRepository: IPortfoliosRepository,
  ) {}

  public async execute({
    id,
    measure_id,
    size,
    price,
  }: IRequest): Promise<Portfolio | undefined> {
    const portfolio = await this.portfoliosRepository.findById(id);

    if (!portfolio) {
      throw new AppError('O produto do portfólio não foi encontrado.', 400);
    }

    Object.assign(portfolio, { measure_id, size, price });

    return this.portfoliosRepository.update(portfolio);
  }
}
