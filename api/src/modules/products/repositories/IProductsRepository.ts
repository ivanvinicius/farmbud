import Product from '@modules/products/infra/typeorm/entities/Product';

export default interface IProductsRepository {
  findAll(): Promise<Product[] | undefined>;
}
