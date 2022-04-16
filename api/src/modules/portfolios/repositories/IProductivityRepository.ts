import IFindProductivityInUseDTO from '../dtos/IFindProductivityInUseDTO';
import Portfolio from '../infra/typeorm/entities/Portfolio';

export default interface IProductivityRepository {
  findProductivityInUse({
    provider_id,
    culture_id,
  }: IFindProductivityInUseDTO): Promise<Portfolio[] | undefined>;
}
