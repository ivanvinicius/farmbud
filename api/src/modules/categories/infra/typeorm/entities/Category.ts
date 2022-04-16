import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { v4 as uuid } from 'uuid';

import Product from '@modules/products/infra/typeorm/entities/Product';

@Entity('categories')
export default class Category {
  constructor(props: Omit<Category, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }

  @PrimaryColumn('uuid')
  readonly id: string;

  @Column('varchar')
  name: string;

  @Column()
  parent_id: string;

  @OneToMany(() => Product, product => product.category)
  product: Product[];
}
