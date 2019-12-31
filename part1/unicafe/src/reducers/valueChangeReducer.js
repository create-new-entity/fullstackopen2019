
let initialValues = {
  good: 0,
  neutral: 0,
  bad: 0
};

const valueChangeReducer = (state = initialValues, action) => {
  let newState = { ...state };
  switch(action.type){
      case 'INCREMENT':
          ++newState[action.feedback]
          return newState;
      default:
          return state;
  }
};

export default valueChangeReducer;