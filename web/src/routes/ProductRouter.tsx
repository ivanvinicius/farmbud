import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import List from '../pages/Product/List';

const ProductRouter: React.FC = () => (
  <Switch>
    <Route path="/products" component={List} isPrivate />
  </Switch>
);

export default ProductRouter;
