import { browserHistory } from 'react-router'

export const promiseMiddleware = store => next => action => {
  if (action.payload && typeof action.payload.then === 'function') {
    store.dispatch({ type: 'ASYNC_START', subtype: action.type });

    action.payload.then(
      res => {
        action.payload = res.data;
        store.dispatch({ type: 'ASYNC_END', promise: action.payload });
        store.dispatch(action);

        action.onSuccess && action.onSuccess(store.getState());
      },
      error => {
        action.payload = error.response;
        action.error = true;
        store.dispatch({ type: 'ASYNC_END', promise: action.payload });
        store.dispatch(action);

        action.onError && action.onError(store.getState(), error.response.status);
      }
    );

    return;
  }

  next(action);
};

// FIXME: move this to reducers
export const localStorageMiddleware = store => next => action => {
  if (action.type === 'APP_LOADED') {
    const currentUser = JSON.parse(window.localStorage.getItem('currentUser'));

    if (currentUser) {
      store.dispatch({ type: 'SET_CURRENT_USER', payload: {...currentUser}})
    }
  }

  if (action.type === 'LOGIN' && !action.error) {
    window.localStorage.setItem('currentUser', JSON.stringify({ ...action.payload }));
  } else if (action.type === 'LOGOUT') {
    window.localStorage.removeItem('currentUser');
  }

  next(action);
};
