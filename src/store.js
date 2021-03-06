import {createStore, applyMiddleware, compose} from 'redux';
import {connectRouter, routerMiddleware} from 'connected-react-router';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import {createRootReducer} from './reducers';

export const history = createHistory();

const store = createStore(
  createRootReducer(history),
  {},
  compose(
    applyMiddleware(
      thunk,
      routerMiddleware(history)
    )
  )
);

export default store;
