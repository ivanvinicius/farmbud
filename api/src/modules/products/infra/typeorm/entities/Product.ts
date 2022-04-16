import {
  Entity,
  PrimaryColumn,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import Brand from '@modules/brands/infra/typeorm/entities/Brand';
import Category from '@modules/categories/infra/typeorm/entities/Category';
import Portfolio from '@modules/portfolios/infra/typeorm/entities/Portfolio';

@Entity('products')
export default class Product {
  constructor(props: Omit<Product, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }

  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid')
  category_id: string;

  @Column('uuid')
  brand_id: string;

  @Column()
  name: string;

  @Column()
  composition?: string;

  @ManyToOne(() => Category, category => category.product)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category: Category;

  @ManyToOne(() => Brand, brand => brand.product)
  @JoinColumn({ name: 'brand_id', referencedColumnName: 'id' })
  brand: Brand;

  @OneToMany(() => Portfolio, portfolio => portfolio.product)
  portfolio: Portfolio[];
}
