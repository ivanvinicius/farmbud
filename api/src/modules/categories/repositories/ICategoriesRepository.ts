import Category from '../infra/typeorm/entities/Category';

export default interface ICategoriesRepository {
  findAll(): Promise<Category[] | undefined>;
}
