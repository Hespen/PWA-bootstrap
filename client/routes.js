import React from 'react';
import { Router , Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history'
import LandingPage from './views/LandingPage/LandingPage';
import NotFoundPage from './views/NotFoundPage/NotFoundPage';
export const routeArray = [
  {
    path:'/',
    component: LandingPage,
    name: 'Landingpage',
    exact: true,
  },
  {
    path:'/*',
    component: NotFoundPage,
    name: 'NotFoundPage'
  }
];

export default props => (
  <Router history={createBrowserHistory()}>
    <Switch>
      {routeArray.map(route => (
        <Route {...route}/>
      ))}
    </Switch>
  </Router>
)

