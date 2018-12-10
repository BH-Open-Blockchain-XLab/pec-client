import "./scss/main.scss";
import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Link, Switch} from "react-router-dom";

import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';

import {
  Dashboard,
//   Buy,
//   Sell,
  Account,
  SignIn,
  Entrance
} from './pages';

import {PlainAppBar} from './components';

import {default as store, history} from './store';


const App = ({history}) => (
  <ConnectedRouter history={history}>
    <div>
      <Switch>
        <Route exact path="/" component={Entrance} />
        <Route path="/signin/" component={SignIn} />
        <Route path="/dashboard/" component={Dashboard} />
        <Route path="/account/" component={Account} />
        <Route component={Entrance} />
      </Switch>
    </div>
  </ConnectedRouter>
);

ReactDOM.render((
  <Provider store={store}>
    <App history={history} />
  </Provider>),
 document.getElementById('root')
);

/*
        <Route path="/" exact component={Entrance} />
        <Route path="/signin/" component={SignIn} />
        <Route path="/dashboard/" component={Dashboard} />
        <Route path="/buy/" component={Buy} />
        <Route path="/sell/" component={Sell} />
        <Route path="/account/" component={Account} />
*/
