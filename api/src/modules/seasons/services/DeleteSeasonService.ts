import { inject, injectable } from 'tsyringe';

import IDeleteDTO from '@shared/dtos/IDeleteDTO';
import AppError from '@shared/errors/AppError';
import ISeasonsRepository from '../repositories/ISeasonsRepository';

@injectable()
export default class DeleteSeasonService {
  constructor(
    @inject('SeasonsRepository')
    private seasonsRepository: ISeasonsRepository,
  ) {}

  public async execute(id: string): Promise<IDeleteDTO> {
    const checkSeasonsExists = await this.seasonsRepository.findById(id);

    if (!checkSeasonsExists) {
      throw new AppError('A temporada informada não existe', 400);
    }

    const deletedSeason = await this.seasonsRepository.delete(id);

    if (deletedSeason.affected === 0) {
      throw new AppError('Impossível deletar o item.', 400);
    }

    return deletedSeason;
  }
}
