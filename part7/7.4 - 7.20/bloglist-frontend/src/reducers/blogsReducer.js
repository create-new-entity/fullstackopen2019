import _ from 'lodash';
import backEndFns from './../services/blogs';

export const blogsInitializeAction = () => {
  return async (dispatch) => {
    let storedBlogs = JSON.parse(window.localStorage.getItem('blogs'));
    if(storedBlogs){
      storedBlogs = _.orderBy(storedBlogs, [(blog) => {
        return blog.likes;
      }], ['desc']);
    }
    dispatch({
      type: 'INITIALIZE',
      blogs: storedBlogs
    });
  };
};

export const blogsLoginAction = () => {
  return async (dispatch) => {
    let blogs = await backEndFns.getAll();
    window.localStorage.setItem('blogs', JSON.stringify(blogs));
    dispatch({
      type: 'LOGIN',
      blogs: _.orderBy(blogs, [(blog) => {
        return blog.likes;
      }], ['desc'])
    });
  };
};

export const blogsLogoutAction = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('blogs');
    dispatch({
      type: 'LOGOUT',
      blogs: []
    });
  };
};

export const blogsLikeAction = (id) => {
  return async (dispatch) => {
    let blog = await backEndFns.incrementLike(id);
    dispatch({
      type: 'LIKE',
      blog
    });
  };
};

export const blogsDeleteAction = (id) => {
  return async (dispatch) => {
    let blogs = JSON.parse(window.localStorage.getItem('blogs'));
    let blogTitle = blogs.find((blog) => blog.id === id).title;
    let reply = window.confirm(`Delete ${blogTitle}?`);
    if(!reply) {
      dispatch({
        type: 'IGNORE'
      });
      return;
    }
    let statusCode = await backEndFns.deleteBlog(id);
    if(statusCode === 204) {
      dispatch({
        type: 'DELETE',
        id
      });
    }
    else dispatch({
      type: 'IGNORE'
    });
  };
};

export const blogsCreateAction = (blog) => {
  return async (dispatch) => {
    blog = await backEndFns.createNewEntry(blog);
    dispatch({
      type: 'CREATE',
      blog
    });
  };
};


const blogsReducer = (state = [], action) => {
  let newBlogs, foundIndex;

  switch (action.type) {

  case 'INITIALIZE':
  case 'LOGIN':
  case 'LOGOUT':
    if(action.blogs) return action.blogs;
    return state;

  case 'LIKE':
    newBlogs = [...state];
    foundIndex = _.findIndex(newBlogs, (blog) => {
      return blog.id === action.blog.id;
    });
    newBlogs[foundIndex].likes++;
    window.localStorage.setItem('blogs', JSON.stringify(newBlogs));
    return _.orderBy(newBlogs, [(blog) => {
      return blog.likes;
    }], ['desc']);

  case 'DELETE':
    newBlogs = [...state];
    newBlogs = _.orderBy(newBlogs.filter((blog) => blog.id !== action.id), [(blog) => blog.likes], ['desc']);
    window.localStorage.setItem('blogs', JSON.stringify(newBlogs));
    return newBlogs;

  case 'CREATE':
    newBlogs = [...state];
    newBlogs.push(action.blog);
    window.localStorage.setItem('blogs', JSON.stringify(newBlogs));
    return _.orderBy(newBlogs, [(blog) => {
      return blog.likes;
    }], ['desc']);

  default:
    return state;

  }
};


export default blogsReducer;