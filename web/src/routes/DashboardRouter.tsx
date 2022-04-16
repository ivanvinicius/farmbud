import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Dashboard from '../pages/Dashboard';
import Help from '../pages/Help';

const DashboardRouter: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} isPrivate />
    <Route path="/help" exact component={Help} isPrivate />
  </Switch>
);

export default DashboardRouter;
