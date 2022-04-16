import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import List from '../pages/Portfolio/List';
import Create from '../pages/Portfolio/Create';
import Update from '../pages/Portfolio/Update';

const PortfolioRouter: React.FC = () => (
  <Switch>
    <Route path="/portfolio" component={List} isPrivate />
    <Route path="/create-portfolio" component={Create} isPrivate />
    <Route path="/update-portfolio" component={Update} isPrivate />
  </Switch>
);

export default PortfolioRouter;
