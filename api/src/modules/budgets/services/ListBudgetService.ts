import { inject, injectable } from 'tsyringe';

import Budget from '../infra/typeorm/entities/Budget';
import IBudgetsRepository from '../repositories/IBudgetsRepository';

interface IRequest {
  user_id: string;
}

@injectable()
export default class ListBudgetService {
  constructor(
    @inject('BudgetsRepository')
    private budgetsRepository: IBudgetsRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Budget[] | undefined> {
    return this.budgetsRepository.findAllByUser(user_id);
  }
}
