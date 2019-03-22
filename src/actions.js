const types = {
  login: 'login',
  logout: 'logout',

  infoDialog: 'infoDialog',
  closeDialog: 'closeDialog',
  confirmDialog: 'confirmDialog',
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

function infoDialog(info){
  return {
    type: types.infoDialog,
	info,
  }
}
function confirmDialog(info, dialogAction){
  return {
    type: types.confirmDialog,
	info,
	dialogAction,
  }
}
function closeDialog(){
  return {
    type: types.closeDialog,
  }
}

export default {
  types,
  login,
  logout,
  infoDialog,
  closeDialog,
  confirmDialog,
};
