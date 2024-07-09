import Axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getTasks = async () => {
  return Axios.get(`${API_URL}/tasks`);
};

export const getTaskById = async (taskId) => {
  return Axios.get(`${API_URL}/tasks/${taskId}`);
};
