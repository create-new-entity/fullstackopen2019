
export const newFilterContentAction = (type, content) => {
  return {
    type: type,
    content: content
  };
};

const filterReducer = (state = '', action) => {
  switch(action.type){
    case 'FILTER':
      return action.content;
    default:
      return state;
  }
};


export default filterReducer;