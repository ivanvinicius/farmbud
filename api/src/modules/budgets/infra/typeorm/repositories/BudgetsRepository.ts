import ICreateBudgetDTO from '@modules/budgets/dtos/ICreateBudgetDTO';
import IFindBudgetAvoidDuplicateDTO from '@modules/budgets/dtos/IFindBudgetAvoidDuplicateDTO';
import IFindBudgetDetailDTO from '@modules/budgets/dtos/IFindBudgetDetailDTO';
import IBudgetsRepository from '@modules/budgets/repositories/IBudgetsRepository';
import { getRepository, Repository } from 'typeorm';
import Budget from '../entities/Budget';

export default class BudgetsRepository implements IBudgetsRepository {
  private ormRepository: Repository<Budget>;

  constructor() {
    this.ormRepository = getRepository(Budget);
  }

  public async findAll(): Promise<Budget[] | undefined> {
    return this.ormRepository.find();
  }

  public async findAllByUser(user_id: string): Promise<Budget[] | undefined> {
    const sqlSelect =
      ' SELECT Provider.id AS provider_id,' +
      ' Provider.name AS provider_name,' +
      ' Season.id AS season_id,' +
      ' Season.name AS season_name,' +
      ' Season.description AS season_description,' +
      ' Season.start_at AS season_start_at,' +
      ' Season.end_at AS season_end_at,' +
      ' Area.id AS area_id,' +
      ' Area.name AS area_name,' +
      ' Area.description AS area_description,' +
      ' Area.size AS area_size,' +
      ' Culture.id AS culture_id,' +
      ' Culture.name AS culture_name,' +
      ' Composition.productivity AS productivity,' +
      ' SUM(amount_cost) AS amount_cost' +
      ' FROM budgets AS Budget' +
      ' INNER JOIN users AS Provider' +
      ' ON Budget.provider_id = Provider.id' +
      ' INNER JOIN seasons AS Season' +
      ' ON Budget.season_id = Season.id' +
      ' INNER JOIN areas AS Area' +
      ' ON Budget.area_id = Area.id' +
      ' INNER JOIN portfolios AS Composition' +
      ' ON Budget.portfolio_id = Composition.id' +
      ' INNER JOIN cultures AS Culture' +
      ' ON Composition.culture_id = Culture.id' +
      ' WHERE Budget.user_id = $1' +
      ' GROUP BY Provider.id, Season.id, Area.id, Composition.productivity, Culture.id' +
      ' ORDER BY Composition.productivity ASC';

    return this.ormRepository.query(sqlSelect, [user_id]);
  }

  public async findBudgetDetail({
    user_id,
    provider_id,
    culture_id,
    productivity,
    area_id,
  }: IFindBudgetDetailDTO): Promise<Budget[] | undefined> {
    const sqlSelect =
      ' SELECT Budget.id AS id,' +
      ' Budget.amount_usage AS amount_usage,' +
      ' Budget.amount_quantity AS amount_quantity,' +
      ' Budget.amount_cost AS amount_cost,' +
      ' Composition.recommendation AS portfolio_recommendation,' +
      ' Composition.productivity AS portfolio_productivity,' +
      ' Portfolio.size AS portfolio_size,' +
      ' Portfolio.price AS portfolio_price,' +
      ' Product.id AS product_id,' +
      ' Product.name AS product_name,' +
      ' Product.composition AS product_composition,' +
      ' Measure.id AS measure_id,' +
      ' Measure.name AS measure_name,' +
      ' Brand.id AS brand_id,' +
      ' Brand.name AS brand_name,' +
      ' Category.id AS cateogory_id,' +
      ' Category.name AS category_name,' +
      ' Subcategory.id AS subcateogory_id,' +
      ' Subcategory.name AS subcategory_name' +
      ' FROM budgets AS Budget' +
      ' INNER JOIN portfolios AS Composition' +
      ' ON Budget.portfolio_id = Composition.id' +
      ' INNER JOIN portfolios AS Portfolio' +
      ' ON Composition.parent_id = Portfolio.id' +
      ' INNER JOIN measures AS Measure' +
      ' ON Portfolio.measure_id = Measure.id' +
      ' INNER JOIN products AS Product' +
      ' ON Portfolio.product_id = Product.id' +
      ' INNER JOIN brands AS Brand' +
      ' ON Product.brand_id = Brand.id' +
      ' INNER JOIN categories AS Subcategory' +
      ' ON Product.category_id  = Subcategory.id' +
      ' INNER JOIN categories AS Category' +
      ' ON Subcategory.parent_id = Category.id' +
      ' WHERE Budget.provider_id = $1' +
      ' AND Budget.user_id = $2' +
      ' AND Composition.culture_id = $3' +
      ' AND Budget.area_id = $4' +
      ' AND Composition.productivity = $5';

    return this.ormRepository.query(sqlSelect, [
      provider_id,
      user_id,
      culture_id,
      area_id,
      productivity,
    ]);
  }

  public async findBudgetAvoidDuplicate({
    area_id,
    season_id,
    portfolio_id,
  }: IFindBudgetAvoidDuplicateDTO): Promise<Budget | undefined> {
    return this.ormRepository.findOne({
      where: { area_id, season_id, portfolio_id },
    });
  }

  public async create(data: ICreateBudgetDTO[]): Promise<Budget[] | undefined> {
    const budgets = this.ormRepository.create(data);

    await this.ormRepository.save(budgets);

    return budgets;
  }
}
