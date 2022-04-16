import { Repository, getRepository } from 'typeorm';

import IMeasuresRepository from '@modules/measures/repositories/IMeasuresRepository';
import Measure from '../entities/Measure';

export default class MeasuresRepository implements IMeasuresRepository {
  private ormRepository: Repository<Measure>;

  constructor() {
    this.ormRepository = getRepository(Measure);
  }

  public async findAll(): Promise<Measure[] | undefined> {
    return this.ormRepository.find();
  }
}
