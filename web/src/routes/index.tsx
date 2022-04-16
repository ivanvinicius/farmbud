import React from 'react';

import LoginRouter from './LoginRouter';
import DashboardRouter from './DashboardRouter';
import ProductRouter from './ProductRouter';
import PortfolioRouter from './PortfolioRouter';
import CompositionRouter from './CompositionRouter';

const Routes: React.FC = () => (
  <>
    <LoginRouter />
    <DashboardRouter />
    <ProductRouter />
    <PortfolioRouter />
    <CompositionRouter />
  </>
);

export default Routes;
