import { browserHistory } from 'react-router'
import {APP_LOADED, LOGIN, ASYNC_END, ASYNC_START, SET_CURRENT_USER} from "./constants/ActionTypes";
import {webSocketConnect} from "./actions/WebsocketActions";
import {ORDER_CHAT_NEW_MESSAGE, NEW_UNREAD_NOTIFICATIONS, ORDER_APPLICATION_DECLINED, ORDER_APPLICATION_APPROVED,
  ORDER_APPLICATION_REQUEST_RECEIVED
} from "./constants/WebSocketsEvents";
import {orderChatNewMessageReceived} from "./actions/OrderChatActions";
import {newUnreadNotifications} from "./actions/NotificationsActions";

export const promiseMiddleware = store => next => action => {
  if (!(action.payload && typeof action.payload.then === 'function')) {
    next(action);
    return;
  }

  store.dispatch({type: ASYNC_START, subtype: action.type});

  action.payload.then(
    res => {
      action.payload = res.data;
      store.dispatch({type: ASYNC_END, promise: action.payload});
      store.dispatch(action);

      action.onSuccess && action.onSuccess(store.getState());
    },
    error => {
      action.payload = error.response;
      action.error = true;
      store.dispatch({type: ASYNC_END, promise: action.payload});
      store.dispatch(action);

      action.onError && action.onError(store.getState(), error.response.status);
    }
  );
};

export const localStorageMiddleware = store => next => action => {
  if (action.type === APP_LOADED) {
    const currentUser = JSON.parse(window.localStorage.getItem('currentUser'));

    if (currentUser) {
      store.dispatch({ type: SET_CURRENT_USER, payload: {...currentUser}})
    }
  }

  if (action.type === LOGIN && !action.error) {
    window.localStorage.setItem('currentUser', JSON.stringify({ ...action.payload }));
  } else if (action.type === 'LOGOUT') {
    window.localStorage.removeItem('currentUser');
  }

  next(action);
};

export const webSocketMiddleware = store => next => action => {
  if (action.type === SET_CURRENT_USER || action.type === LOGIN) {
    const webSocketEvents = [{
      key: ORDER_CHAT_NEW_MESSAGE,
      handler: message => store.dispatch(orderChatNewMessageReceived(message))
    }, {
      key: NEW_UNREAD_NOTIFICATIONS,
      handler: notifications => store.dispatch(newUnreadNotifications(notifications))
    }, {
      key: ORDER_APPLICATION_DECLINED,
      handler: application => store.dispatch(orderApplicationDeclinedReceived(application))
    }, {
      key: ORDER_APPLICATION_APPROVED,
      handler: application => store.dispatch(orderApplicationApprovedReceived(application))
    }, {
      key: ORDER_APPLICATION_REQUEST_RECEIVED,
      handler: application => store.dispatch(orderApplicationRequestReceived(application))
    }];

    const userToken = JSON.parse(window.localStorage.getItem('currentUser')).token;
    store.dispatch(webSocketConnect(userToken, webSocketEvents));
  }

  next(action);
};
