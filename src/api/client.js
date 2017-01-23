import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: __API_URL,
  responseType: 'json'
});

axiosInstance.interceptors.request.use(config => {
  const token = window.localStorage.getItem('token');

  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  return config;
});

// facade
export const apiClient = {
  get: axiosInstance.get,
  post: axiosInstance.post,
  delete: axiosInstance.delete,
  put: axiosInstance.put,
  patch: axiosInstance.patch
};
