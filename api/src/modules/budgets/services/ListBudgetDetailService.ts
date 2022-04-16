import { inject, injectable } from 'tsyringe';

import Budget from '../infra/typeorm/entities/Budget';
import IBudgetsRepository from '../repositories/IBudgetsRepository';

interface IRequest {
  user_id: string;
  provider_id: string;
  culture_id: string;
  productivity: number;
  area_id: string;
}

@injectable()
export default class ListBudgetDetailService {
  constructor(
    @inject('BudgetsRepository')
    private budgetsRepository: IBudgetsRepository,
  ) {}

  public async execute({
    user_id,
    provider_id,
    culture_id,
    area_id,
    productivity,
  }: IRequest): Promise<Budget[] | undefined> {
    return this.budgetsRepository.findBudgetDetail({
      user_id,
      provider_id,
      culture_id,
      area_id,
      productivity,
    });
  }
}
