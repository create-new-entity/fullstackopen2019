
let initialState = {
  content: 'ignore',
  display: 'none'
};

const notificationReducer = (state = initialState, action) => {
  switch(action.type){
    case 'vote':
      return {
        ...action.data,
        content: `You voted ${action.data.content}`
      };
    case 'create':
      return {
        ...action.data,
        content: `You created ${action.data.content}`
      };
    case 'hide':
      return {
        content: 'ignore',
        display: 'none'
      };
    default:
      return state;
  }
};

export const showNotificationAction = (type, content, timer) => {
  return async (dispatch) => {
    dispatch({
      type: type,
      data: {
        content: content,
        display: ''
      }
    });

    setTimeout(() => dispatch(hideNotificationAction()), timer * 1000);
  };
}

export const hideNotificationAction = () => {
  return {
    type: 'hide',
    data: {
      content: 'ignore',
      display: 'none'
    }
  }
}

export default notificationReducer;