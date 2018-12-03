import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Link, Switch } from "react-router-dom";

import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';

import {
  Dashboard,
  Buy,
  Sell,
  Account,
  SignIn,
  Entrance
} from './pages';

import "./styles/style.css";
import {default as store, history} from './store';


const App = ({history}) => (
  <ConnectedRouter history={history}>
      <div>
        <Route path="/" exact component={Entrance} />
        <Route path="/signin/" component={SignIn} />
        <Route path="/dashboard/" component={Dashboard} />
        <Route path="/buy/" component={Buy} />
        <Route path="/sell/" component={Sell} />
        <Route path="/account/" component={Account} />
      </div>
  </ConnectedRouter>
);

ReactDOM.render((
  <Provider store={store}>
    <App history={history} />
  </Provider>),
 document.getElementById('root')
);

