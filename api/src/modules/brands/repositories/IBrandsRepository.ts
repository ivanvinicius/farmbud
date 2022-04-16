import Brand from '../infra/typeorm/entities/Brand';

export default interface IBrandsRepository {
  findAll(): Promise<Brand[] | undefined>;
}
