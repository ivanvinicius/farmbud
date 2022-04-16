import Product from '@modules/products/infra/typeorm/entities/Product';
import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('brands')
export default class Brand {
  constructor(props: Omit<Brand, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }

  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Product, product => product.brand)
  product: Product[];
}
