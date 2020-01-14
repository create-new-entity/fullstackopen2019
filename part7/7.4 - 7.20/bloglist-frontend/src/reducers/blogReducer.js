import backEndFns from './../services/blogs';

export const newCommentAction = (id, newComment) => {
  return async (dispatch) => {
    let updatedBlog = await backEndFns.addNewComment(id, newComment);
    dispatch({
      type: 'UPDATE_COMMENTS',
      data: updatedBlog.comments
    });
  };
};

export const initializeCommentsAction = (comments) => {
  return async (dispatch) => {
    dispatch({
      type: 'INITIALIZE_COMMENTS',
      data: comments
    });
  };
};

const blogReducer = (state = [], action) => {
  switch (action.type) {

  case 'UPDATE_COMMENTS':
  case 'INITIALIZE_COMMENTS':
    return action.data;
  default:
    return state;

  }
};

export default blogReducer;