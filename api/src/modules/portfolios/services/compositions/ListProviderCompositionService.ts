import { inject, injectable } from 'tsyringe';

import Portfolio from '@modules/portfolios/infra/typeorm/entities/Portfolio';
import ICompositionsRepository from '@modules/portfolios/repositories/ICompositionsRepository';

interface IRequest {
  provider_id: string;
}
@injectable()
export default class ListProviderCompositionService {
  constructor(
    @inject('CompositionsRepository')
    private compositionsRepository: ICompositionsRepository,
  ) {}

  public async execute({
    provider_id,
  }: IRequest): Promise<Portfolio[] | undefined> {
    return this.compositionsRepository.findAllGroupByCultureProductivity(
      provider_id,
    );
  }
}
