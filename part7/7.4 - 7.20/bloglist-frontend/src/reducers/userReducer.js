import backEndFns from './../services/blogs';

export const userInititializeAction = () => {
  let user = {};
  return async (dispatch) => {
    let storedUser = JSON.parse(window.localStorage.getItem('user'));
    if(storedUser) {
      user = storedUser;
      await backEndFns.setToken(user.token);
    }
    dispatch({
      type: 'INITIALIZE',
      user
    });
  };
};

export const userLoginAction = (user) => {
  return async (dispatch) => {
    await backEndFns.setToken(user.token);
    window.localStorage.setItem('user', JSON.stringify(user));
    dispatch({
      type: 'LOGIN',
      user
    });
  };
};

export const userLogoutAction = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('user');
    dispatch({
      type: 'LOGOUT',
      user: {}
    });
  };
};



const userReducer = (state = {}, action) => {
  switch (action.type) {

  case 'INITIALIZE':
  case 'LOGIN':
  case 'LOGOUT':
    if(action.user) return action.user;
    return state;
  default:
    return state;
  }

};


export default userReducer;