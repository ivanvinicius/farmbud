import { inject, injectable } from 'tsyringe';

import Category from '../infra/typeorm/entities/Category';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

@injectable()
export default class ListCategoriesService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute(): Promise<Category[] | undefined> {
    return this.categoriesRepository.findAll();
  }
}
