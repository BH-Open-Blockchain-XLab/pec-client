const types = {
  login: 'login',
  logout: 'logout',
};

function login(token){
  return {
    type: types.login,
    token,
  };
}

function logout(){
  return {
    type: types.logout,
  };
}


export default {
  types,
  login,
  logout,
};
