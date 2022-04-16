import { injectable, inject } from 'tsyringe';

import IDeleteDTO from '@shared/dtos/IDeleteDTO';
import AppError from '@shared/errors/AppError';

import Portfolio from '@modules/portfolios/infra/typeorm/entities/Portfolio';
import IPortfoliosRepository from '../../repositories/IPortfoliosRepository';

interface IRequest {
  ids: Array<string>;
}

@injectable()
export default class DeletePortfolioService {
  constructor(
    @inject('PortfoliosRepository')
    private portfoliosRepository: IPortfoliosRepository,
  ) {}

  public async execute({ ids }: IRequest): Promise<IDeleteDTO | undefined> {
    const portfoliosExists = await this.portfoliosRepository.findAllByIds(ids);

    if (!portfoliosExists || portfoliosExists.length === 0) {
      throw new AppError(
        'Não existe nenhum portfólio com essas informações.',
        400,
      );
    }

    const portfolioIds: Array<string> = [];

    portfoliosExists.map(({ id }: Portfolio) => portfolioIds.push(id));

    const deletedPortfolio = await this.portfoliosRepository.delete(
      portfolioIds,
    );

    if (deletedPortfolio.affected === 0) {
      throw new AppError('Impossível deletar o item.', 400);
    }

    return deletedPortfolio;
  }
}
