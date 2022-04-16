import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IAreasRepository from '../repositories/IAreasRepository';
import Area from '../infra/typeorm/entities/Area';

interface IRequest {
  id: string;
  name: string;
  description?: string;
  size: number;
  latitude: number;
  longitude: number;
}

@injectable()
export default class UpdateAreaService {
  constructor(
    @inject('AreasRepository')
    private areasRepository: IAreasRepository,
  ) {}

  public async execute({
    id,
    name,
    description,
    size,
    latitude,
    longitude,
  }: IRequest): Promise<Area> {
    const area = await this.areasRepository.findById(id);

    if (!area) {
      throw new AppError('Área informada não existe.', 400);
    }

    Object.assign(area, { name, description, size, latitude, longitude });

    return this.areasRepository.update(area);
  }
}
