import axios from 'axios';

export const accessTokenInterceptor = ({ getState, dispatch }, config) => {
  const { user } = getState();

  if (user && user.accessToken) {
    config.headers['Authorization'] = `Bearer ${user.accessToken}`;
  }

  return config;
};

//noinspection JSUnresolvedVariable
const axiosInstance = axios.create({
  baseURL: __API_URL,
  responseType: 'json',
  // interceptors: {
  //   // request: [accessTokenInterceptor],
  //   // response: [clearUserDataIfHttpCodeIs401]
  // }
});

export const promiseMiddleware = store => next => action => {
  if (action.payload && typeof action.payload.then == 'function') {
    store.dispatch({ type: 'ASYNC_START', subtype: action.type });

    action.payload.then(
      res => {
        console.log('RESULT', res);
        action.payload = res.data;
        store.dispatch({ type: 'ASYNC_END', promise: action.payload });
        store.dispatch(action);
      },
      error => {
        console.log('ERROR', error);
        action.error = true;
        action.payload = error.response;
        store.dispatch(action);
      }
    );

    return;
  }

  next(action);
};

// facade
export const apiClient = {
  get: axiosInstance.get,
  post: axiosInstance.post,
  delete: axiosInstance.delete,
  put: axiosInstance.put,
  patch: axiosInstance.patch
};
