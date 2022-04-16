import IDeleteDTO from '@shared/dtos/IDeleteDTO';
import Portfolio from '../infra/typeorm/entities/Portfolio';
import IFindPortfolioAvoidDuplicateDTO from '../dtos/IFindPortfolioAvoidDuplicateDTO';
import ICreatePortfolioDTO from '../dtos/ICreatePortfolioDTO';

export default interface IPortfoliosRepository {
  findById(id: string): Promise<Portfolio | undefined>;
  findAllByIds(ids: Array<string>): Promise<Portfolio[] | undefined>;
  findAllByProvider(provider_id: string): Promise<Portfolio[] | undefined>;
  findPortfolioAvoidDuplicate(
    data: IFindPortfolioAvoidDuplicateDTO,
  ): Promise<Portfolio | undefined>;
  create(data: ICreatePortfolioDTO): Promise<Portfolio | undefined>;
  update(data: Portfolio): Promise<Portfolio>;
  delete(ids: Array<string>): Promise<IDeleteDTO>;
}
