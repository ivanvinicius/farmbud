import { getRepository, Repository } from 'typeorm';

import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import Category from '../entities/Category';

export default class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async findAll(): Promise<Category[] | undefined> {
    return this.ormRepository.find();
  }
}
