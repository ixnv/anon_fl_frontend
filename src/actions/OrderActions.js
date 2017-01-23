import {ORDER_LIST_FETCH, ORDER_LIST_UNLOAD, ORDER_GET, ORDER_UNLOAD,
        ORDER_CONTRACTOR_LIST_FETCH, ORDER_CONTRACTOR_LIST_UNLOAD, ORDER_CUSTOMER_LIST_FETCH, ORDER_CUSTOMER_LIST_UNLOAD}
        from '../constants/ActionTypes';

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

export const orderContractorListFetch = (payload) => ({
  type: ORDER_CONTRACTOR_LIST_FETCH,
  payload
});

export const orderContractorListUnload = () => ({
  type: ORDER_CONTRACTOR_LIST_UNLOAD
});

export const orderCustomerListFetch = (payload) => ({
  type: ORDER_CUSTOMER_LIST_FETCH,
  payload
});

export const orderCustomerListUnload = () => ({
  type: ORDER_CUSTOMER_LIST_UNLOAD
});
