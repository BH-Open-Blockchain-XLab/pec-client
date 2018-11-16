import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import {
  Dashboard,
  Buy,
  Sell,
  Account,
  SignIn,
  Entrance
} from './pages';

import "./styles/style.css";

const App = () => (
  <Router>
    <div>
      <Route path="/" exact component={Entrance} />
      <Route path="/signin/" component={SignIn} />
      <Route path="/dashboard/" component={Dashboard} />
      <Route path="/buy/" component={Buy} />
      <Route path="/sell/" component={Sell} />
      <Route path="/account/" component={Account} />
    </div>
  </Router>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

