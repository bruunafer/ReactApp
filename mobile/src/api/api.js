import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.107:3000',  // <-- Coloque aqui o IP da sua máquina na rede
  timeout: 5000,
});

export default api;
