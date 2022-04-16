import { inject, injectable } from 'tsyringe';

import Season from '../infra/typeorm/entities/Season';
import ISeasonsRepository from '../repositories/ISeasonsRepository';

@injectable()
export default class ListUserSeasonService {
  constructor(
    @inject('SeasonsRepository')
    private seasonsRepository: ISeasonsRepository,
  ) {}

  public async execute(user_id: string): Promise<Season[] | undefined> {
    return this.seasonsRepository.findAllByUser(user_id);
  }
}
