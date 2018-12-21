const logout = (dispatch) => {
  let id = localStorage.getItem('sessionId');
  api.delete("/usr/logout", {
    sessionId: id,
    msg: "logout",
  });
  localStorage.removeItem('sessionId');
  dispatch(ACTION.logout());
  dispatch(push("/"));
};


export default {
  logout,
};
