import React from 'react'
import ManageUser from './pages/ManageUser'
import { createBrowserHistory } from 'history';
import { Switch, Router, Route } from 'react-router';
import EditUser from './pages/EditUser';

export const history = createBrowserHistory();
export default function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path={'/Home/:page'} exact component={ManageUser} />
        <Route path={'/User/:id'} exact component={EditUser} />
      </Switch>
    </Router>
  )
};