import { injectable, inject } from 'tsyringe';

import Measure from '../infra/typeorm/entities/Measure';
import IMeasuresRepository from '../repositories/IMeasuresRepository';

@injectable()
export default class ListMeasureService {
  constructor(
    @inject('MeasuresRepository')
    private measuresRepository: IMeasuresRepository,
  ) {}

  public async execute(): Promise<Measure[] | undefined> {
    return this.measuresRepository.findAll();
  }
}
