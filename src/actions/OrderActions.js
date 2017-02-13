import {
  ORDER_LIST_FETCH, ORDER_LIST_UNLOAD, ORDER_GET, ORDER_UNLOAD, ORDER_CREATE,
  ORDER_CONTRACTOR_LIST_FETCH, ORDER_CONTRACTOR_LIST_UNLOAD, ORDER_CUSTOMER_LIST_FETCH, ORDER_CUSTOMER_LIST_UNLOAD,
  ORDER_TAG_ADD, ORDER_TAG_REMOVE, ORDER_FILTER_PROCESSED, ORDER_FILTER_UPDATE, ORDER_FILTER_RESET
} from '../constants/ActionTypes';

import {Order} from '../api/resources';

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

export const orderCreate = (title, description, price, category_id, tags) => ({
  type: ORDER_CREATE,
  payload: Order.create(title, description, price, category_id, tags)
});

export const addOrderTag = (tag) => ({
  type: ORDER_TAG_ADD,
  tag
});

export const removeOrderTag = (id) => ({
  type: ORDER_TAG_REMOVE,
  id
});

export const ordersFilterUpdate = (filterType, param) => ({
  type: ORDER_FILTER_UPDATE,
  filterType,
  param
});

export const ordersFilterReset = () => ({
  type: ORDER_FILTER_RESET
});

export const ordersFilterProcessed = () => ({
  type: ORDER_FILTER_PROCESSED
});
