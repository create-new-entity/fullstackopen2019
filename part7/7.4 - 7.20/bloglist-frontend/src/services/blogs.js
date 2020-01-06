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
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const login = async (credentials) => {
  let response = await axios.post(loginUrl, credentials);
  return response.data;
};

const getOneUserDetails = async (id) => {
  let response = await axios.get(`${userUrl}/${id}`);
  return response.data;
};

const getAllUsersDetails = async () => {
  let response = await axios.get(userUrl);
  return response.data;
};

const createNewEntry = async (payload) => {
  let config = {
    headers : {
      Authorization: token
    }
  };

  let response = await axios.post(baseUrl, payload, config);
  return response.data;
};

const incrementLike = async (id) => {
  let response = await axios.put(`${baseUrl}/${id}`);
  return response.data;
};

const deleteBlog = async (id) => {
  let config = {
    headers : {
      Authorization: token
    }
  };
  let response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.status;
};

export default {
  getAll,
  login,
  setToken,
  getToken,
  getOneUserDetails,
  getAllUsersDetails,
  incrementLike,
  createNewEntry,
  deleteBlog
};