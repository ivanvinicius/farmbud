import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import List from '../pages/Composition/List';
import Detail from '../pages/Composition/Detail';
import Create1 from '../pages/Composition/Create1';
import Create2 from '../pages/Composition/Create2';

const CompositionRouter: React.FC = () => (
  <Switch>
    <Route path="/composition" component={List} isPrivate />
    <Route path="/composition-detail" component={Detail} isPrivate />
    <Route path="/create-composition-step-1" component={Create1} isPrivate />
    <Route path="/create-composition-step-2" component={Create2} isPrivate />
  </Switch>
);

export default CompositionRouter;
