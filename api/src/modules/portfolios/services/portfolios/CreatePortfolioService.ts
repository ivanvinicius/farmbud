import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Portfolio from '../../infra/typeorm/entities/Portfolio';
import IPortfoliosRepository from '../../repositories/IPortfoliosRepository';

interface IRequest {
  provider_id: string;
  product_id: string;
  measure_id: string;
  size: number;
  price: number;
}

@injectable()
export default class CreatePortfolioService {
  constructor(
    @inject('PortfoliosRepository')
    private portfoliosRepository: IPortfoliosRepository,
  ) {}

  public async execute({
    provider_id,
    product_id,
    measure_id,
    size,
    price,
  }: IRequest): Promise<Portfolio | undefined> {
    const portfolioExists = await this.portfoliosRepository.findPortfolioAvoidDuplicate(
      { provider_id, product_id, size },
    );

    if (portfolioExists) {
      throw new AppError('Já existe um item com as mesmas informações.', 400);
    }

    const newPortfolio = await this.portfoliosRepository.create({
      provider_id,
      product_id,
      measure_id,
      size,
      price,
    });

    return newPortfolio;
  }
}
