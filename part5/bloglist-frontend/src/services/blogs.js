import axios from 'axios';
const baseUrl = '/api/blogs';
const loginUrl = '/api/login';
const userUrl = '/api/users';

let token;

const setToken = (newToken) => {
  token = 'Bearer ' + newToken;
};

const getToken = () => {
  return token;
};

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const login = async (credentials) => {
  let response = await axios.post(loginUrl, credentials);
  return response.data;
};

const getOneUserDetails = async (id) => {
  let response = await axios.get(`${userUrl}/${id}`);
  return response.data;
}

export default {
  getAll,
  login,
  setToken,
  getToken,
  getOneUserDetails
}