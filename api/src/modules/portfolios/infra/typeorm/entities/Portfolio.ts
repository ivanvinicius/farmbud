import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import User from '@modules/users/infra/typeorm/entities/User';
import Product from '@modules/products/infra/typeorm/entities/Product';
import Culture from '@modules/cultures/infra/typeorm/entities/Culture';
import Measure from '@modules/measures/infra/typeorm/entities/Measure';
import Budget from '@modules/budgets/infra/typeorm/entities/Budget';

@Entity('portfolios')
export default class Portfolio {
  constructor(props: Omit<Portfolio, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }

  @PrimaryColumn('uuid')
  readonly id: string;

  @Column('uuid')
  parent_id: string;

  @Column('uuid')
  provider_id: string;

  @Column('uuid')
  product_id: string;

  @Column('uuid')
  culture_id: string;

  @Column('uuid')
  measure_id: string;

  @Column('decimal')
  size: number;

  @Column('decimal')
  price: number;

  @Column('decimal')
  recommendation: number;

  @Column('numeric')
  productivity: number;

  @ManyToOne(() => User, user => user.portfolio)
  @JoinColumn({ name: 'provider_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Product, product => product.portfolio)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Product;

  @ManyToOne(() => Culture, culture => culture.portfolio)
  @JoinColumn({ name: 'culture_id', referencedColumnName: 'id' })
  culture: Culture;

  @ManyToOne(() => Measure, measure => measure.portfolio)
  @JoinColumn({ name: 'measure_id', referencedColumnName: 'id' })
  measure: Measure;

  @OneToMany(() => Budget, budget => budget.portfolio)
  budget: Budget[];
}
