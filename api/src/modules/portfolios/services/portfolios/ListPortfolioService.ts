import { inject, injectable } from 'tsyringe';

import Portfolio from '../../infra/typeorm/entities/Portfolio';
import IPortfoliosRepository from '../../repositories/IPortfoliosRepository';

@injectable()
export default class ListPortfolioService {
  constructor(
    @inject('PortfoliosRepository')
    private portfoliosRepository: IPortfoliosRepository,
  ) {}

  public async execute(provider_id: string): Promise<Portfolio[] | undefined> {
    return this.portfoliosRepository.findAllByProvider(provider_id);
  }
}
