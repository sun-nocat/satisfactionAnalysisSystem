import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import LoginPage from './routes/LoginPage';
import DataPage from './routes/DataImport';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" exact component={LoginPage} />
        <Route path="/"  component={IndexPage} >
          {/* <Route path="datapage" component={DataPage} /> */}
        </Route>

      </Switch>
    </Router>
  );
}

export default RouterConfig;
