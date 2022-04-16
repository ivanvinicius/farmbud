import Budget from '@modules/budgets/infra/typeorm/entities/Budget';
import User from '@modules/users/infra/typeorm/entities/User';
import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('seasons')
export default class Season {
  constructor(props: Omit<Season, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }

  @PrimaryColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  name: string;

  @Column()
  description?: string;

  @Column('timestamp')
  start_at: Date;

  @Column('timestamp')
  end_at: Date;

  @ManyToOne(() => User, user => user.season)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @OneToMany(() => Budget, budget => budget.season)
  budget: Budget[];
}
