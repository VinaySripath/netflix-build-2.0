import axios from "axios";

export const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

instance.interceptors.request.use((config) => {
  config.params = {
    api_key: process.env.REACT_APP_API_KEY,
    ...config.params,
  };
  return config;
});
