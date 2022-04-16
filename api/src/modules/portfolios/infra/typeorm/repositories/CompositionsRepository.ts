import { getRepository, Repository } from 'typeorm';

import ICreateProviderCompositionDTO from '@modules/portfolios/dtos/ICreateProviderCompositionDTO';
import IFindAllByProviderCultureProductivityDTO from '@modules/portfolios/dtos/IFindAllByProviderCultureProductivityDTO';
import IFindProviderCompositionAvoidDuplicateDTO from '@modules/portfolios/dtos/IFindProviderCompositionAvoidDuplicateDTO';
import ICompositionsRepository from '@modules/portfolios/repositories/ICompositionsRepository';
import IDeleteDTO from '@shared/dtos/IDeleteDTO';
import IFindProvidersAvailableCompositionsDTO from '@modules/portfolios/dtos/IFindProvidersAvailableCompositionsDTO';
import Portfolio from '../entities/Portfolio';

export default class CompositionsRepository implements ICompositionsRepository {
  private ormRepository: Repository<Portfolio>;

  constructor() {
    this.ormRepository = getRepository(Portfolio);
  }

  public async findById(id: string): Promise<Portfolio | undefined> {
    return this.ormRepository.findOne({ where: { id } });
  }

  public async findAllGroupByCultureProductivity(
    provider_id: string,
  ): Promise<Portfolio[] | undefined> {
    const sqlSelect =
      'SELECT Portfolio.productivity AS productivity,' +
      ' Provider.id AS provider_id,' +
      ' Provider.name AS provider_name,' +
      ' Culture.id AS culture_id,' +
      ' Culture.name AS culture_name' +
      ' FROM portfolios AS Portfolio' +
      ' LEFT JOIN cultures AS Culture' +
      ' ON Portfolio.culture_id = Culture.id' +
      ' LEFT JOIN users AS Provider' +
      ' ON Portfolio.provider_id = Provider.id' +
      ' WHERE Portfolio.productivity IS NOT NULL' +
      ' AND Provider.id = $1' +
      ' GROUP BY' +
      ' Portfolio.productivity,' +
      ' Provider.id,' +
      ' Culture.id';

    return this.ormRepository.query(sqlSelect, [provider_id]);
  }

  public async findProviderCompositionAvoidDuplicate({
    provider_id,
    culture_id,
    productivity,
  }: IFindProviderCompositionAvoidDuplicateDTO): Promise<
    Portfolio | undefined
  > {
    return this.ormRepository.findOne({
      where: { provider_id, culture_id, productivity },
    });
  }

  public async findProvidersAvailableCompositions({
    culture_id,
    productivity,
  }: IFindProvidersAvailableCompositionsDTO): Promise<Portfolio[] | undefined> {
    const selectProvidersByQuery =
      'SELECT Provider.id AS provider_id,' +
      ' Provider.name AS provider_name' +
      ' FROM portfolios AS Portfolio' +
      ' LEFT JOIN users AS Provider' +
      ' ON Portfolio.provider_id = Provider.id' +
      ' WHERE parent_id IS NOT NULL' +
      ' AND culture_id = $1' +
      ' AND productivity = $2' +
      ' GROUP BY Provider.id';

    return this.ormRepository.query(selectProvidersByQuery, [
      culture_id,
      productivity,
    ]);
  }

  public async findAllByProviderCultureProductivity({
    provider_id,
    culture_id,
    productivity,
  }: IFindAllByProviderCultureProductivityDTO): Promise<
    Portfolio[] | undefined
  > {
    const selectCompositionsByQuery =
      'SELECT Composition.id as id,' +
      ' Portfolio.size as size,' +
      ' Portfolio.price as price,' +
      ' Composition.recommendation as recommendation,' +
      ' Composition.productivity as productivity,' +
      ' Brand.id AS brand_id,' +
      ' Brand.name AS brand_name,' +
      ' Product.id AS product_id,' +
      ' Product.name AS product_name,' +
      ' Measure.id AS measure_id,' +
      ' Measure.name AS measure_name,' +
      ' Category.id as category_id,' +
      ' Category.name AS category_name,' +
      ' Subcategory.id AS subcategory_id,' +
      ' Subcategory.name AS subcategory_name,' +
      ' Culture.id AS culture_id,' +
      ' Culture.name AS culture_name,' +
      ' Provider.id AS provider_id,' +
      ' Provider.name AS provider_name  ' +
      ' FROM portfolios AS Composition' +
      ' LEFT JOIN cultures AS Culture' +
      ' ON Composition.culture_id = Culture.id' +
      ' LEFT JOIN portfolios AS Portfolio' +
      ' ON Composition.parent_id = Portfolio.id' +
      ' LEFT JOIN users AS Provider' +
      ' ON Portfolio.provider_id = Provider.id' +
      ' LEFT JOIN products AS Product' +
      ' ON Portfolio.product_id = Product.id' +
      ' LEFT JOIN measures AS Measure' +
      ' ON Portfolio.measure_id = Measure.id' +
      ' LEFT JOIN categories AS Subcategory' +
      ' ON Product.category_id = Subcategory.id' +
      ' LEFT JOIN categories AS Category' +
      ' ON Subcategory.parent_id = Category.id' +
      ' LEFT JOIN brands AS Brand' +
      ' ON Product.brand_id = Brand.id' +
      ' WHERE  Provider.id = $1' +
      ' AND Culture.id = $2' +
      ' AND Composition.productivity = $3 ' +
      ' AND Composition.parent_id IS NOT NULL ';

    return this.ormRepository.query(selectCompositionsByQuery, [
      provider_id,
      culture_id,
      productivity,
    ]);
  }

  public async create(
    data: ICreateProviderCompositionDTO[],
  ): Promise<Portfolio[] | undefined> {
    const composition = this.ormRepository.create(data);

    await this.ormRepository.save(composition);

    return composition;
  }

  public async delete(ids: Array<string>): Promise<IDeleteDTO> {
    return this.ormRepository.delete(ids);
  }
}
