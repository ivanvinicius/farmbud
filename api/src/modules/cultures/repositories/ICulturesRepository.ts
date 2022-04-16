import Culture from '../infra/typeorm/entities/Culture';

export default interface ICulturesRepository {
  findAll(): Promise<Culture[] | undefined>;

  findById(id: string): Promise<Culture | undefined>;
}
