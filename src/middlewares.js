import { browserHistory } from 'react-router'

export const promiseMiddleware = store => next => action => {
  if (action.payload && typeof action.payload.then === 'function') {
    store.dispatch({ type: 'ASYNC_START', subtype: action.type });

    action.payload.then(
      res => {
        action.payload = res.data;
        store.dispatch({ type: 'ASYNC_END', promise: action.payload });
        store.dispatch(action);

        action.onSuccess && action.onSuccess();
      },
      error => {
        action.payload = error.response;
        action.error = true;
        store.dispatch({ type: 'ASYNC_END', promise: action.payload });
        store.dispatch(action);

        action.onError && action.onError();
      }
    );

    return;
  }

  next(action);
};

export const localStorageMiddleware = store => next => action => {
  if (action.type === 'APP_LOADED') {
    const token = window.localStorage.getItem('token');
    const username = window.localStorage.getItem('username');
    const email = window.localStorage.getItem('email');

    if (token) {
      store.dispatch({ type: 'SET_CURRENT_USER', payload: { username, email }})
    }
  }

  if (action.type === 'LOGIN' && !action.error) {
    // FIXME: little bit too messy, innit?
    window.localStorage.setItem('token', action.payload.token);
    window.localStorage.setItem('username', action.payload.username);
    window.localStorage.setItem('email', action.payload.email);
  } else if (action.type === 'LOGOUT') {
    window.localStorage.setItem('token', '');
    window.localStorage.setItem('username', '');
    window.localStorage.setItem('email', '');
  }

  next(action);
};

export const redirectGuestsMiddleware = store => next => action => {
  const state = store.getState();

  if (state.common.appLoaded && !state.users.currentUser.loggedIn && browserHistory.getCurrentLocation().pathname !== '/') {
    browserHistory.push('/');
  }

  next(action);
};
