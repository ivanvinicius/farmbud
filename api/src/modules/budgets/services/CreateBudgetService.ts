import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import Budget from '../infra/typeorm/entities/Budget';
import IBudgetsRepository from '../repositories/IBudgetsRepository';

interface IItemsProps {
  portfolio_id: string;
  amount_usage: number;
  amount_quantity: number;
  amount_cost: number;
}

interface IRequest {
  user_id: string;
  provider_id: string;
  area_id: string;
  season_id: string;
  items: IItemsProps[];
}

@injectable()
export default class CreateBudgetsService {
  constructor(
    @inject('BudgetsRepository')
    private budgetsRepository: IBudgetsRepository,
  ) {}

  public async execute({
    user_id,
    provider_id,
    area_id,
    season_id,
    items,
  }: IRequest): Promise<Budget[] | undefined> {
    const budgetExists = await this.budgetsRepository.findBudgetAvoidDuplicate({
      area_id,
      season_id,
      portfolio_id: items[0].portfolio_id,
    });

    if (budgetExists) {
      throw new AppError(
        'Já existe um orçamento com as mesmas informações nesta área.',
        400,
      );
    }

    const formatted = items.map((item: IItemsProps) => ({
      ...item,
      user_id,
      provider_id,
      area_id,
      season_id,
    }));

    return this.budgetsRepository.create(formatted);
  }
}
