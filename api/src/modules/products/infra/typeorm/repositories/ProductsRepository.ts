import { Repository, getRepository } from 'typeorm';

import Product from '@modules/products/infra/typeorm/entities/Product';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';

export default class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  /* Select by query to get detailed categories */
  public async findAll(): Promise<Product[] | undefined> {
    const selectProductsByQuery =
      'SELECT Product.id AS id,' +
      ' Product.name AS name,' +
      ' Product.composition AS composition,' +
      ' Brand.id AS brand_id,' +
      ' Brand.name AS brand_name,' +
      ' categories.id AS category_id,' +
      ' categories.name AS category_name,' +
      ' Subcategories.id AS subcategory_id,' +
      ' Subcategories.name AS subcategory_name' +
      ' FROM products AS Product' +
      ' LEFT JOIN brands AS Brand' +
      ' ON Brand.id = Product.brand_id     ' +
      ' LEFT JOIN categories AS Subcategories' +
      ' ON Subcategories.id = Product.category_id' +
      ' LEFT JOIN categories AS categories' +
      ' ON categories.id = Subcategories.parent_id';

    return this.ormRepository.query(selectProductsByQuery);
  }
}
