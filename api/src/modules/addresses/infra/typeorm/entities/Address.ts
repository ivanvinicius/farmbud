import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { v4 as uuid } from 'uuid';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('addresses')
export default class Address {
  constructor(props: Omit<Address, 'id'>, id?: string) {
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

  @OneToMany(() => User, user => user.address)
  user: User[];
}
