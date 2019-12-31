
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

export const voteOrCreateNotification = (type, content) => {
  return {
    type: type,
    data: {
      content: content,
      display: ''
    }
  };
}

export const hideNotification = () => {
  return {
    type: 'hide',
    data: {
      content: 'ignore',
      display: 'none'
    }
  }
}

export default notificationReducer;