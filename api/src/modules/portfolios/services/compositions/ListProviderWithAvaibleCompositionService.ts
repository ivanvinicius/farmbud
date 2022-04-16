import { inject, injectable } from 'tsyringe';

import Portfolio from '@modules/portfolios/infra/typeorm/entities/Portfolio';
import ICompositionsRepository from '@modules/portfolios/repositories/ICompositionsRepository';

interface IRequest {
  culture_id: string;
  productivity: number;
}

@injectable()
export default class ListProviderWithAvaibleCompositionService {
  constructor(
    @inject('CompositionsRepository')
    private compositionsRepository: ICompositionsRepository,
  ) {}

  public async execute({
    culture_id,
    productivity,
  }: IRequest): Promise<Portfolio[] | undefined> {
    return this.compositionsRepository.findProvidersAvailableCompositions({
      culture_id,
      productivity,
    });
  }
}
