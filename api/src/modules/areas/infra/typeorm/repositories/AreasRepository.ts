import { Repository, getRepository, Raw } from 'typeorm';

import IAreasRepository from '@modules/areas/repositories/IAreasRepository';
import Area from '@modules/areas/infra/typeorm/entities/Area';
import ICreateAreaDTO from '@modules/areas/dtos/ICreateAreaDTO';
import IFindUserAreaDTO from '@modules/areas/dtos/IFindUserAreaDTO';
import IDeleteDTO from '@shared/dtos/IDeleteDTO';

export default class AreasRepository implements IAreasRepository {
  private ormRepository: Repository<Area>;

  constructor() {
    this.ormRepository = getRepository(Area);
  }

  public async findById(id: string): Promise<Area | undefined> {
    return this.ormRepository.findOne({ where: { id } });
  }

  public async findAreaByUserAndName({
    user_id,
    name,
  }: IFindUserAreaDTO): Promise<Area | undefined> {
    return this.ormRepository.findOne({
      where: {
        user_id,
        name: Raw(alias => `${alias} ILIKE '%${name}%'`),
      },
    });
  }

  public async findAllByUser(user_id: string): Promise<Area[] | undefined> {
    return this.ormRepository.find({ where: { user_id } });
  }

  public async create(data: ICreateAreaDTO): Promise<Area> {
    const area = this.ormRepository.create(data);

    await this.ormRepository.save(area);

    return area;
  }

  public async update(data: Area): Promise<Area> {
    return this.ormRepository.save(data);
  }

  public async delete(id: string): Promise<IDeleteDTO> {
    return this.ormRepository.delete(id);
  }
}
