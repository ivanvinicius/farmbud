import Area from '@modules/areas/infra/typeorm/entities/Area';

import IDeleteDTO from '@shared/dtos/IDeleteDTO';
import ICreateAreaDTO from '../dtos/ICreateAreaDTO';
import IFindUserAreaDTO from '../dtos/IFindUserAreaDTO';

export default interface IAreasRepository {
  findById(id: string): Promise<Area | undefined>;
  findAllByUser(user_id: string): Promise<Area[] | undefined>;
  findAreaByUserAndName(data: IFindUserAreaDTO): Promise<Area | undefined>;
  create(data: ICreateAreaDTO): Promise<Area>;
  update(data: Area): Promise<Area>;
  delete(id: string): Promise<IDeleteDTO>;
}
