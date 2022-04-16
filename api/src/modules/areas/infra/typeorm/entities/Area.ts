import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import User from '@modules/users/infra/typeorm/entities/User';
import Budget from '@modules/budgets/infra/typeorm/entities/Budget';

@Entity('areas')
export default class Area {
  constructor(props: Omit<User, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }

  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @Column()
  name: string;

  @Column()
  description?: string;

  @Column('decimal')
  size: number;

  @Column('numeric')
  latitude: number;

  @Column('numeric')
  longitude: number;

  @ManyToOne(() => User, user => user.area)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @OneToMany(() => Budget, budget => budget.portfolio)
  budget: Budget[];
}
