import { inject, injectable } from 'tsyringe';

import Portfolio from '@modules/portfolios/infra/typeorm/entities/Portfolio';
import ICompositionsRepository from '@modules/portfolios/repositories/ICompositionsRepository';

interface IRequest {
  provider_id: string;
  culture_id: string;
  productivity: number;
}
@injectable()
export default class ListProviderCompositionDetailService {
  constructor(
    @inject('CompositionsRepository')
    private compositionsRepository: ICompositionsRepository,
  ) {}

  public async execute({
    provider_id,
    culture_id,
    productivity,
  }: IRequest): Promise<Portfolio[] | undefined> {
    return this.compositionsRepository.findAllByProviderCultureProductivity({
      provider_id,
      culture_id,
      productivity,
    });
  }
}
