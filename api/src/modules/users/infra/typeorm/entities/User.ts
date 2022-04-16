import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { v4 as uuid } from 'uuid';

import Address from '@modules/addresses/infra/typeorm/entities/Address';
import Area from '@modules/areas/infra/typeorm/entities/Area';
import Season from '@modules/seasons/infra/typeorm/entities/Season';
import Portfolio from '@modules/portfolios/infra/typeorm/entities/Portfolio';
import Budget from '@modules/budgets/infra/typeorm/entities/Budget';

@Entity('users')
export default class User {
  constructor(props: Omit<User, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }

  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid')
  address_id?: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  provider: boolean;

  @ManyToOne(() => Address, address => address.user)
  @JoinColumn({ name: 'address_id', referencedColumnName: 'id' })
  address: Address;

  @OneToMany(() => Area, area => area.user)
  area: Area[];

  @OneToMany(() => Season, season => season.user)
  season: Season[];

  @OneToMany(() => Portfolio, portfolio => portfolio.user)
  portfolio: Portfolio[];

  @OneToMany(() => Budget, budget => budget.user)
  @OneToMany(() => Budget, budget => budget.provider)
  budget: Budget[];
}
