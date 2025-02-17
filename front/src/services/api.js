import axios from "axios";


const criarInstanciaAPI = (baseURL) => {
  const api = axios.create({ baseURL });

  api.interceptors.request.use(
    (config) => {
      const token = sessionStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return api;
};


export const API_ALOCACAO = criarInstanciaAPI("http://localhost:8080");
export const API_MENSAGERIA = criarInstanciaAPI("url_mensageria");
export const GATEWAY = criarInstanciaAPI("url_gateway");
