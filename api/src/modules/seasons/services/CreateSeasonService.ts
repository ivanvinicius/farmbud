import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { differenceInMonths } from 'date-fns';

import Season from '../infra/typeorm/entities/Season';
import ISeasonsRepository from '../repositories/ISeasonsRepository';

interface IRequest {
  user_id: string;
  name: string;
  description?: string;
  start_at: Date;
  end_at: Date;
}
@injectable()
export default class CreateSeasonService {
  constructor(
    @inject('SeasonsRepository')
    private seasonsRepository: ISeasonsRepository,
  ) {}

  public async execute({
    user_id,
    name,
    description,
    start_at,
    end_at,
  }: IRequest): Promise<Season | undefined> {
    const seasonNameExists = await this.seasonsRepository.findSeasonByNameAndUser(
      {
        name,
        user_id,
      },
    );

    if (seasonNameExists) {
      throw new AppError('O nome da temporada já está em uso.', 400);
    }

    if (differenceInMonths(end_at, start_at) < 1) {
      throw new AppError(
        'A temporada não pode conter duração menor que um mês.',
        400,
      );
    }

    if (differenceInMonths(end_at, start_at) > 12) {
      throw new AppError('A temporada não pode ser maior que um ano.', 400);
    }

    const newSeason = await this.seasonsRepository.create({
      user_id,
      name,
      description,
      start_at,
      end_at,
    });

    return newSeason;
  }
}
