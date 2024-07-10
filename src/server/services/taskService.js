import axios from 'axios';

// Configuração global do Axios
axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

// Funções de API
export const getTasks = async () => {
  return axios.get('/tasks');
};

export const getTaskById = async (taskId) => {
  return axios.get(`/tasks/${taskId}`);
};
