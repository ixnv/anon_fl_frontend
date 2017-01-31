import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: __API_URL,
  responseType: 'json'
});

axiosInstance.interceptors.request.use(config => {
  const currentUser = JSON.parse(window.localStorage.getItem('currentUser'));

  if (currentUser) {
    config.headers['Authorization'] = `Token ${currentUser.token}`;
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
