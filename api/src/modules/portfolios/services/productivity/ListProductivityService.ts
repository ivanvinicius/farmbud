import { injectable, inject } from 'tsyringe';

import Portfolio from '@modules/portfolios/infra/typeorm/entities/Portfolio';
import IProductivityRepository from '@modules/portfolios/repositories/IProductivityRepository';

interface IRequest {
  provider_id: string;
  culture_id: string;
}

@injectable()
export default class ListProductivityService {
  constructor(
    @inject('ProductivityRepository')
    private productivityRepository: IProductivityRepository,
  ) {}

  public async execute({
    provider_id,
    culture_id,
  }: IRequest): Promise<Portfolio[] | undefined> {
    return this.productivityRepository.findProductivityInUse({
      provider_id,
      culture_id,
    });
  }
}
