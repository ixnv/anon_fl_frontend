import * as types from '../constants/ActionTypes';

export const orderListFetch = (payload) => ({
  type: types.ORDER_LIST_FETCH,
  payload
});

export const orderListUnload = () => ({
  type: types.ORDER_LIST_UNLOAD
});
