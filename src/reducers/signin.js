import ACTION from '../actions';

const initialState = {
  isLoggedIn: false,
};

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
