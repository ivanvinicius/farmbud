import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/Login/SignIn';
import SignUp from '../pages/Login/SignUp';

const LoginRouter: React.FC = () => (
  <Switch>
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />
  </Switch>
);

export default LoginRouter;
