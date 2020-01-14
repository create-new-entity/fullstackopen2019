import backEndFns from './../services/blogs';

export const reloadUsersAction = () => {
  return async (dispatch) => {
    let allUsersDetails = await backEndFns.getAllUsersDetails();
    let usersData = allUsersDetails.reduce((acc, curr) => {
      acc.push({
        name: curr.name,
        count: curr.blogs.length,
        id: curr.id
      });
      return acc;
    }, []);
    dispatch({
      type: 'RELOAD',
      data: usersData
    });
  };
};

export const clearUsersAction = () => {
  return async (dispatch) => {
    dispatch({
      type: 'CLEAR'
    });
  };
};

const usersReducer = (state = [], action) => {
  switch (action.type) {

  case 'RELOAD':
    return action.data;
  case 'CLEAR':
    return [];
  default:
    return state;

  }
};

export default usersReducer;