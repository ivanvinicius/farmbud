import { inject, injectable } from 'tsyringe';

import Brand from '../infra/typeorm/entities/Brand';
import IBrandsRepository from '../repositories/IBrandsRepository';

@injectable()
export default class ListBrandService {
  constructor(
    @inject('BrandsRepository')
    private brandsRepository: IBrandsRepository,
  ) {}

  public async execute(): Promise<Brand[] | undefined> {
    return this.brandsRepository.findAll();
  }
}
