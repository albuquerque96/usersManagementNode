import axios from 'axios';
axios.defaults.withCredentials = true;
const API_URL = 'http://localhost:5000';

export const getTasks = async () => {
  return axios.get(`${API_URL}/tasks`);
};

export const getTaskById = async (taskId) => {
  return axios.get(`${API_URL}/tasks/${taskId}`);
};
