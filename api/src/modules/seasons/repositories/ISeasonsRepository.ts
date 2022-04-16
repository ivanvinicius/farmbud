import IDeleteDTO from '@shared/dtos/IDeleteDTO';
import Season from '../infra/typeorm/entities/Season';
import ICreateSeasonDTO from '../dtos/ICreateSeasonDTO';
import IFindSeasonByNameAndUserDTO from '../dtos/IFindSeasonByNameAndUserDTO';

export default interface ISeasonsRepository {
  findById(id: string): Promise<Season | undefined>;
  findAllByUser(user_id: string): Promise<Season[] | undefined>;
  findSeasonByNameAndUser(
    data: IFindSeasonByNameAndUserDTO,
  ): Promise<Season | undefined>;
  create(data: ICreateSeasonDTO): Promise<Season | undefined>;
  update(data: Season): Promise<Season>;
  delete(id: string): Promise<IDeleteDTO>;
}
