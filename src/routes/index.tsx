import React from 'react';
import { Switch } from 'react-router-dom';
import SignIn from '../pages/Signin';
import SignUp from '../pages/Signup';
import Dashboard from '../pages/dashboard';
import Route from './Route';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Profile from '../pages/Profile';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={SignIn} />
    <Route exact path="/signup" component={SignUp} />
    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/reset-password" component={ResetPassword} />
    <Route path="/profile" component={Profile} isPrivate />
  </Switch>
);

export default Routes;
