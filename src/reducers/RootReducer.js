import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import signin from './signin';

const createRouteReducer =  (history) => combineReducers({
  router: connectRouter(history),
  signin,
});

export default createRouteReducer;
