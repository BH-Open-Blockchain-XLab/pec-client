import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

const createRouteReducer =  (history) => combineReducers({
  router: connectRouter(history),
  // rest of reducers
});

export default createRouteReducer;
