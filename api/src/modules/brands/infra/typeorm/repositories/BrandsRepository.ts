import { getRepository, Repository } from 'typeorm';

import IBrandsRepository from '@modules/brands/repositories/IBrandsRepository';
import Brand from '../entities/Brand';

export default class BrandsRepository implements IBrandsRepository {
  private ormRepository: Repository<Brand>;

  constructor() {
    this.ormRepository = getRepository(Brand);
  }

  public async findAll(): Promise<Brand[] | undefined> {
    return this.ormRepository.find();
  }
}
