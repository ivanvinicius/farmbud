import { getRepository, Repository, Raw } from 'typeorm';

import ISeasonsRepository from '@modules/seasons/repositories/ISeasonsRepository';
import ICreateSeasonDTO from '@modules/seasons/dtos/ICreateSeasonDTO';
import IFindSeasonByNameAndUserDTO from '@modules/seasons/dtos/IFindSeasonByNameAndUserDTO';
import IDeleteDTO from '@shared/dtos/IDeleteDTO';
import Season from '../entities/Season';

export default class SeasonsRepository implements ISeasonsRepository {
  private ormRepository: Repository<Season>;

  constructor() {
    this.ormRepository = getRepository(Season);
  }

  public async findById(id: string): Promise<Season | undefined> {
    return this.ormRepository.findOne({ where: { id } });
  }

  public async findAllByUser(user_id: string): Promise<Season[] | undefined> {
    return this.ormRepository.find({
      where: {
        user_id,
      },
    });
  }

  public async findSeasonByNameAndUser({
    user_id,
    name,
  }: IFindSeasonByNameAndUserDTO): Promise<Season | undefined> {
    return this.ormRepository.findOne({
      where: {
        user_id,
        name: Raw(alias => `${alias} ILIKE '%${name}%'`),
      },
    });
  }

  public async create(
    seasonData: ICreateSeasonDTO,
  ): Promise<Season | undefined> {
    const season = this.ormRepository.create(seasonData);

    await this.ormRepository.save(season);

    return season;
  }

  public async update(data: Season): Promise<Season> {
    return this.ormRepository.save(data);
  }

  public async delete(id: string): Promise<IDeleteDTO> {
    return this.ormRepository.delete(id);
  }
}
