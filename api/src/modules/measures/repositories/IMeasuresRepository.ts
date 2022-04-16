import Measure from '../infra/typeorm/entities/Measure';

export default interface IMeasuresRepository {
  findAll(): Promise<Measure[] | undefined>;
}
