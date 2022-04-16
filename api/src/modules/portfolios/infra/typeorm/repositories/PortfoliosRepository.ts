import { Repository, getRepository, In } from 'typeorm';

import IPortfoliosRepository from '@modules/portfolios/repositories/IPortfoliosRepository';
import IFindPortfolioAvoidDuplicateDTO from '@modules/portfolios/dtos/IFindPortfolioAvoidDuplicateDTO';
import ICreatePortfolioDTO from '@modules/portfolios/dtos/ICreatePortfolioDTO';
import IDeleteDTO from '@shared/dtos/IDeleteDTO';
import Portfolio from '../entities/Portfolio';

export default class PortfoliosRepository implements IPortfoliosRepository {
  private ormRepository: Repository<Portfolio>;

  constructor() {
    this.ormRepository = getRepository(Portfolio);
  }

  public async findById(id: string): Promise<Portfolio | undefined> {
    return this.ormRepository.findOne({
      where: {
        id,
      },
    });
  }

  public async findAllByIds(
    ids: Array<string>,
  ): Promise<Portfolio[] | undefined> {
    return this.ormRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  public async findAllByProvider(
    provider_id: string,
  ): Promise<Portfolio[] | undefined> {
    const selectPortfolioByQuery =
      'SELECT Portfolio.id AS id,' +
      ' Portfolio.size AS size,' +
      ' Portfolio.price AS price,' +
      ' Portfolio.provider_id AS provider_id,' +
      ' Product.id AS product_id,' +
      ' Product.name AS product_name,' +
      ' Product.composition AS product_composition,' +
      ' Brand.id AS brand_id,' +
      ' Brand.name AS brand_name,' +
      ' Measure.id AS measure_id,' +
      ' Measure.name AS measure_name,' +
      ' Category.id AS category_id,' +
      ' Category.name AS category_name,' +
      ' Subcategory.id AS subcategory_id,' +
      ' Subcategory.name AS subcategory_name' +
      ' FROM portfolios AS Portfolio' +
      ' LEFT JOIN products AS Product' +
      ' ON Portfolio.product_id = Product.id' +
      ' LEFT JOIN brands AS Brand' +
      ' ON Product.brand_id = Brand.id' +
      ' LEFT JOIN measures AS Measure' +
      ' ON Portfolio.measure_id = Measure.id' +
      ' LEFT JOIN categories AS Subcategory' +
      ' ON Product.category_id = Subcategory.id' +
      ' LEFT JOIN categories AS Category' +
      ' ON Category.id = Subcategory.parent_id' +
      ' WHERE Portfolio.provider_id = $1 AND Portfolio.parent_id IS NULL';

    return this.ormRepository.query(selectPortfolioByQuery, [provider_id]);
  }

  public async findPortfolioAvoidDuplicate({
    provider_id,
    product_id,
    size,
  }: IFindPortfolioAvoidDuplicateDTO): Promise<Portfolio | undefined> {
    return this.ormRepository.findOne({
      where: {
        provider_id,
        product_id,
        size,
      },
    });
  }

  public async create({
    provider_id,
    product_id,
    measure_id,
    size,
    price,
  }: ICreatePortfolioDTO): Promise<Portfolio | undefined> {
    const portfolio = this.ormRepository.create({
      provider_id,
      product_id,
      measure_id,
      size,
      price,
    });

    await this.ormRepository.save(portfolio);

    return portfolio;
  }

  public async update(data: Portfolio): Promise<Portfolio> {
    return this.ormRepository.save(data);
  }

  public async delete(ids: Array<string>): Promise<IDeleteDTO> {
    return this.ormRepository.delete(ids);
  }
}
