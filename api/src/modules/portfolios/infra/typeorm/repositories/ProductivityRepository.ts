import IFindProductivityInUseDTO from '@modules/portfolios/dtos/IFindProductivityInUseDTO';
import IProductivityRepository from '@modules/portfolios/repositories/IProductivityRepository';
import { getRepository, Repository } from 'typeorm';
import Portfolio from '../entities/Portfolio';

export default class ProductivityRepository implements IProductivityRepository {
  private ormRepository: Repository<Portfolio>;

  constructor() {
    this.ormRepository = getRepository(Portfolio);
  }

  public async findProductivityInUse({
    provider_id,
    culture_id,
  }: IFindProductivityInUseDTO): Promise<Portfolio[] | undefined> {
    const sqlSelect =
      'SELECT Portfolio.productivity AS productivity' +
      ' FROM portfolios AS Portfolio' +
      ' WHERE Portfolio.productivity IS NOT NULL' +
      ' AND Portfolio.provider_id = $1' +
      ' AND Portfolio.culture_id = $2' +
      ' GROUP BY Portfolio.productivity';

    return this.ormRepository.query(sqlSelect, [provider_id, culture_id]);
  }
}
