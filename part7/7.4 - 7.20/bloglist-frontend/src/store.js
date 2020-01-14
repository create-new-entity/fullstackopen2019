import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import userReducer from './reducers/userReducer';
import blogReducer from './reducers/blogReducer';
import blogsReducer from './reducers/blogsReducer';
import notificationReducer from './reducers/notificationReducer';
import usersReducer from './reducers/usersReducer';


const reducer = combineReducers({
  user: userReducer,
  comments: blogReducer,
  blogs: blogsReducer,
  notification: notificationReducer,
  users: usersReducer
});

const store = createStore(reducer, applyMiddleware(thunk));


export default store;