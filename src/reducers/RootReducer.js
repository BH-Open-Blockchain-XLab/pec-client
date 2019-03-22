import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import signin from './signin';
import dialog from './dialog';

const createRouteReducer =  (history) => combineReducers({
  router: connectRouter(history),
  signin,
  dialog,
});

export default createRouteReducer;
