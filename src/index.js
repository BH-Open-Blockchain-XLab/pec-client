import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Link, Switch} from "react-router-dom";

import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import "./scss/main.scss";

import api from './jsonapi';

import {
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
    if(res.msg == "alive"){
      return;
    }
    console.log("session not valid");
    store.dispatch(ACTION.logout());
  }
}

function init(){
  initialLogin();
}

init();

const App = ({history}) => (
  <ConnectedRouter history={history}>
    <div>
      <div class="c-bgdiv bg-secondary c-bottomLayer"></div>
      <div>
        <Switch>
          <Route exact path="/" component={Entrance} />
          <Route path="/signin/" component={SignIn} />
          <Route path="/signup/" component={SignUp} />
          <Route path="/account/" component={Account} />
          <Route path="/buy/" component={Buy} />
          <Route path="/sell/" component={Sell} />
          <Route component={Entrance} />
        </Switch>
      </div>
    </div>
  </ConnectedRouter>
);

ReactDOM.render((
  <Provider store={store}>
    <App history={history} />
  </Provider>),
 document.getElementById('root')
);

