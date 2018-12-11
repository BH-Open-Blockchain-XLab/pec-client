import {initialState} from '../store';
import ACTION from '../actions';

const signReducer = (state=initialState, action) => {
  switch(action.type){
    case ACTION.types.login:
      return {
        ...state,
        isLoggedIn: true,
        sessionToken: action.token
      };
    case ACTION.types.logout:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default signReducer;
