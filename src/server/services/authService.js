import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

export const login = async (email, password) => {
  return axios.post('/login', { email, password });
};

export const register = async (email, password) => {
  return axios.post('/user', { email, password });
};
