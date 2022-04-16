import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

import User from '@modules/users/infra/typeorm/entities/User';
import Portfolio from '@modules/portfolios/infra/typeorm/entities/Portfolio';
import Area from '@modules/areas/infra/typeorm/entities/Area';
import Season from '@modules/seasons/infra/typeorm/entities/Season';

@Entity('budgets')
export default class Budget {
  constructor(props: Omit<Budget, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }

  @PrimaryColumn('uuid')
  readonly id: string;

  @Column('uuid')
  user_id: string;

  @Column('uuid')
  provider_id: string;

  @Column('uuid')
  portfolio_id: string;

  @Column('uuid')
  area_id: string;

  @Column('uuid')
  season_id: string;

  @Column('decimal')
  amount_usage: number;

  @Column('decimal')
  amount_cost: number;

  @Column('decimal')
  amount_quantity: number;

  @ManyToOne(() => User, user => user.portfolio)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => User, provider => provider.portfolio)
  @JoinColumn({ name: 'provider_id', referencedColumnName: 'id' })
  provider: User;

  @ManyToOne(() => Portfolio, portfolio => portfolio.budget)
  @JoinColumn({ name: 'portfolio_id', referencedColumnName: 'id' })
  portfolio: Portfolio;

  @ManyToOne(() => Area, area => area.budget)
  @JoinColumn({ name: 'area_id', referencedColumnName: 'id' })
  area: Area;

  @ManyToOne(() => Season, season => season.budget)
  @JoinColumn({ name: 'season_id', referencedColumnName: 'id' })
  season: Season;
}
