import { dummyUser, dummyBlogs } from './../../dummyData';

const login = ({ username, password }) => {

  console.log('Attempted login with username: ', username);
  console.log('Attempted login with password: ', password);

  if(username === 'testuser' && password === 'testuser') return Promise.resolve(dummyUser);
  throw new Error();
};

const getAll = () => {
  console.log('Called dummy getAll()');

  return Promise.resolve(dummyBlogs);
};

const setToken = (token) => {
  return token;
};

export default {
  login,
  getAll,
  setToken
};