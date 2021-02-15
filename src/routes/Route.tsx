import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';
import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}
const Router: React.FC<RouteProps> = ({
  isPrivate,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();
  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        if (!isPrivate) return <Component />;
        if (isPrivate && !!user) return <Component />;
        return <Redirect to={{ pathname: '/', state: { from: location } }} />;
      }}
    />
  );
};

export default Router;
