import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IAreasRepository from '../repositories/IAreasRepository';
import Area from '../infra/typeorm/entities/Area';

interface IRequest {
  user_id: string;
  name: string;
  description?: string;
  size: number;
  latitude: number;
  longitude: number;
}

@injectable()
export default class CreateAreaService {
  constructor(
    @inject('AreasRepository')
    private areasRepository: IAreasRepository,
  ) {}

  public async execute({
    user_id,
    name,
    description,
    size,
    latitude,
    longitude,
  }: IRequest): Promise<Area> {
    const checkAreaExists = await this.areasRepository.findAreaByUserAndName({
      user_id,
      name,
    });

    if (checkAreaExists) {
      throw new AppError('O nome de área informado já está em uso', 400);
    }

    return this.areasRepository.create({
      user_id,
      name,
      description,
      size,
      latitude,
      longitude,
    });
  }
}
