const { SnakeNamingStrategy } = require('typeorm-naming-strategies'); //eslint-disable-line

module.exports = {
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: 5442,
  username: 'postgres',
  password: 'postgresdb',
  database: 'farmbud',
  logging: true,
  entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
  migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
  cli: {
    migrationsDir: './src/shared/infra/typeorm/migrations',
  },
  namingStrategy: new SnakeNamingStrategy(),
};
