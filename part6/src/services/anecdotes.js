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

const update = async (id, updatedAnecdote) => {
  let response = await axios.put(`${baseURL}/${id}`, updatedAnecdote);
  return response.status;
}

export default {
  getAll,
  createNew,
  update
};