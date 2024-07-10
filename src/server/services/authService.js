import axios from 'axios';
axios.defaults.withCredentials = true;
const API_URL = 'http://localhost:5000';

export const login = async (email, password) => {
  return axios.post(`${API_URL}/login`, { email, password });
};

export const register  = async (email,password) => {
    return axios.post(`${API_URL}/user`, { email, password });
  };

