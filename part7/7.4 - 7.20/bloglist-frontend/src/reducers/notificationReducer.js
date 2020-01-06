
export const showNotificationAction = (message) => {
  return async (dispatch) => {
    dispatch({
      type: 'SHOW_NOTIFICATION',
      data: message
    });
    setTimeout(() => {
      dispatch({
        type: 'HIDE_NOTIFICATION',
        data: {
          message: ''
        }
      });
    }, 700);
  };
};

const notificationReducer = (state = { message: '' }, action) => {
  switch (action.type) {

  case 'SHOW_NOTIFICATION':
    return action.data;
  case 'HIDE_NOTIFICATION':
    return action.data;
  default:
    return state;

  }
};

export default notificationReducer;