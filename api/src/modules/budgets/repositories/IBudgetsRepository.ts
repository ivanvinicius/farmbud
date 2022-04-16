import ICreateBudgetDTO from '../dtos/ICreateBudgetDTO';
import IFindBudgetAvoidDuplicateDTO from '../dtos/IFindBudgetAvoidDuplicateDTO';
import IFindBudgetDetailDTO from '../dtos/IFindBudgetDetailDTO';
import Budget from '../infra/typeorm/entities/Budget';

export default interface IBudgetsRepository {
  findAll(): Promise<Budget[] | undefined>;
  findAllByUser(user_id: string): Promise<Budget[] | undefined>;
  findBudgetDetail(data: IFindBudgetDetailDTO): Promise<Budget[] | undefined>;
  findBudgetAvoidDuplicate(
    data: IFindBudgetAvoidDuplicateDTO,
  ): Promise<Budget | undefined>;
  create(data: ICreateBudgetDTO[]): Promise<Budget[] | undefined>;
}
