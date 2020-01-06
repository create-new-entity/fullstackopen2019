import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import userReducer from './reducers/userReducer';
import blogsReducer from './reducers/blogsReducer';
import notificationReducer from './reducers/notificationReducer';
import usersReducer from './reducers/usersReducer';


const reducer = combineReducers({
  user: userReducer,
  blogs: blogsReducer,
  notification: notificationReducer,
  users: usersReducer
});

const store = createStore(reducer, applyMiddleware(thunk));


export default store;