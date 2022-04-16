import { container } from 'tsyringe';

import '@shared/container/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';

import IBrandsRepository from '@modules/brands/repositories/IBrandsRepository';
import BrandsRepository from '@modules/brands/infra/typeorm/repositories/BrandsRepository';

import IMeasuresRepository from '@modules/measures/repositories/IMeasuresRepository';
import MeasuresRepository from '@modules/measures/infra/typeorm/repositories/MeasuresRepository';

import ICulturesRepository from '@modules/cultures/repositories/ICulturesRepository';
import CulturesRepository from '@modules/cultures/infra/typeorm/repositories/CulturesRepository';

import IAreasRepository from '@modules/areas/repositories/IAreasRepository';
import AreasRepository from '@modules/areas/infra/typeorm/repositories/AreasRepository';

import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import CategoriesRepository from '@modules/categories/infra/typeorm/repositories/CategoriesRepository';

import IAddressesRepository from '@modules/addresses/repositories/IAddressesRepository';
import AddressesRepository from '@modules/addresses/infra/typeorm/repositories/AddressesRepository';

import ISeasonsRepository from '@modules/seasons/repositories/ISeasonsRepository';
import SeasonsRepository from '@modules/seasons/infra/typeorm/repositories/SeasonsRepository';

import IPortfoliosRepository from '@modules/portfolios/repositories/IPortfoliosRepository';
import PortfoliosRepository from '@modules/portfolios/infra/typeorm/repositories/PortfoliosRepository';

import ICompositionsRepository from '@modules/portfolios/repositories/ICompositionsRepository';
import CompositionsRepository from '@modules/portfolios/infra/typeorm/repositories/CompositionsRepository';

import IBudgetsRepository from '@modules/budgets/repositories/IBudgetsRepository';
import BudgetsRepository from '@modules/budgets/infra/typeorm/repositories/BudgetsRepository';

import IProductivityRepository from '@modules/portfolios/repositories/IProductivityRepository';
import ProductivityRepository from '@modules/portfolios/infra/typeorm/repositories/ProductivityRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IBrandsRepository>(
  'BrandsRepository',
  BrandsRepository,
);

container.registerSingleton<IMeasuresRepository>(
  'MeasuresRepository',
  MeasuresRepository,
);

container.registerSingleton<ICulturesRepository>(
  'CulturesRepository',
  CulturesRepository,
);

container.registerSingleton<IAreasRepository>(
  'AreasRepository',
  AreasRepository,
);

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<IAddressesRepository>(
  'AddressesRepository',
  AddressesRepository,
);

container.registerSingleton<ISeasonsRepository>(
  'SeasonsRepository',
  SeasonsRepository,
);

container.registerSingleton<IPortfoliosRepository>(
  'PortfoliosRepository',
  PortfoliosRepository,
);

container.registerSingleton<ICompositionsRepository>(
  'CompositionsRepository',
  CompositionsRepository,
);

container.registerSingleton<IBudgetsRepository>(
  'BudgetsRepository',
  BudgetsRepository,
);

container.registerSingleton<IProductivityRepository>(
  'ProductivityRepository',
  ProductivityRepository,
);
