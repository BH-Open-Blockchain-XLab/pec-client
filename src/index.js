import "./scss/main.scss";
import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Link, Switch} from "react-router-dom";

import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';

import api from './jsonapi';

import {
  Dashboard,
  Buy,
  Sell,
  Account,
  SignIn,
  SignUp,
  Entrance
} from './pages';

import {PlainAppBar} from './components';

import {default as store, history} from './store';
import ACTION from './actions';

async function initialLogin(){
  let sessionId = localStorage.getItem('sessionId');
  if (sessionId != null){
    store.dispatch(ACTION.login(sessionId));
    let res = await api.get("/usr/alive/alive/" + sessionId);
    if(res.msg != "alive" && store.getState().signin.isLoggedIn){
      store.dispatch(ACTION.logout());
    }
  }
}

initialLogin();

const App = ({history}) => (
  <ConnectedRouter history={history}>
    <div>
      <Switch>
        <Route exact path="/" component={Entrance} />
        <Route path="/signin/" component={SignIn} />
        <Route path="/signup/" component={SignUp} />
        <Route path="/dashboard/" component={Dashboard} />
        <Route path="/account/" component={Account} />
        <Route path="/buy/" component={Buy} />
        <Route path="/sell/" component={Sell} />
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
