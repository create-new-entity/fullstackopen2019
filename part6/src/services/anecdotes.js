import axios from 'axios';

const baseURL = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  let response = await axios.get(baseURL);
  return response.data;
};

const createNew = async (data) => {
  let response = await axios.post(baseURL, data);
  return response.data;
};

export default {
  getAll,
  createNew
};