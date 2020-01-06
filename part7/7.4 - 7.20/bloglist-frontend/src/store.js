import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import userReducer from './reducers/userReducer';
import blogsReducer from './reducers/blogsReducer';


const reducer = combineReducers({
  user: userReducer,
  blogs: blogsReducer
});

const store = createStore(reducer, applyMiddleware(thunk));


export default store;