import { injectable, inject } from 'tsyringe';

import ICulturesRepository from '../repositories/ICulturesRepository';
import Culture from '../infra/typeorm/entities/Culture';

@injectable()
export default class ListCultureService {
  constructor(
    @inject('CulturesRepository')
    private culturesRepository: ICulturesRepository,
  ) {}

  public async execute(): Promise<Culture[] | undefined> {
    return this.culturesRepository.findAll();
  }
}
