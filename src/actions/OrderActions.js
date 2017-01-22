import {ORDER_LIST_FETCH, ORDER_LIST_UNLOAD, ORDER_GET, ORDER_UNLOAD} from '../constants/ActionTypes';

export const orderListFetch = (payload) => ({
  type: ORDER_LIST_FETCH,
  payload
});

export const orderListUnload = () => ({
  type: ORDER_LIST_UNLOAD
});

export const orderGet = (payload) => ({
  type: ORDER_GET,
  payload
});

export const orderUnload = () => ({
  type: ORDER_UNLOAD
});
