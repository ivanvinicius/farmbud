import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { v4 as uuid } from 'uuid';

import Portfolio from '@modules/portfolios/infra/typeorm/entities/Portfolio';

@Entity('measures')
export default class Measure {
  constructor(props: Omit<Measure, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }

  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Portfolio, portfolio => portfolio.measure)
  portfolio: Portfolio[];
}
