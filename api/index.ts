import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com', // Substitua com a URL da sua API
});

export default api;
