import { injectable, inject } from 'tsyringe';

import IAreasRepository from '../repositories/IAreasRepository';
import Area from '../infra/typeorm/entities/Area';

@injectable()
export default class ListUserAreaService {
  constructor(
    @inject('AreasRepository')
    private areasRepository: IAreasRepository,
  ) {}

  public async execute(user_id: string): Promise<Area[] | undefined> {
    return this.areasRepository.findAllByUser(user_id);
  }
}
