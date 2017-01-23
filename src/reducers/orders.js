import {ORDER_LIST_FETCH, ORDER_LIST_UNLOAD, ORDER_GET, ORDER_UNLOAD,
        ORDER_CONTRACTOR_LIST_FETCH, ORDER_CONTRACTOR_LIST_UNLOAD, ORDER_CUSTOMER_LIST_FETCH, ORDER_CUSTOMER_LIST_UNLOAD
        } from './../constants/ActionTypes';

const initialState = {
  orders: [],
  order: {},
  contractor: [],
  customer: [],
  inProgress: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ORDER_LIST_FETCH:
      return {
        ...state,
        orders: action.payload.results
      };
    case ORDER_LIST_UNLOAD:
      return {
        ...state,
        orders: []
      };
    case ORDER_GET:
      return {
        ...state,
        order: action.payload
      };
    case ORDER_UNLOAD:
      return {
        ...state,
        order: {}
      };
    case ORDER_CONTRACTOR_LIST_FETCH:
      return {
        ...state,
        contractor: action.payload.results
      };
    case ORDER_CUSTOMER_LIST_FETCH:
      return {
        ...state,
        customer: action.payload.results
      };
    case ORDER_CONTRACTOR_LIST_UNLOAD:
      return {
        ...state,
        contractor: []
      };
    case ORDER_CUSTOMER_LIST_UNLOAD:
      return {
        ...state,
        contractor: []
      };
    case 'ASYNC_START':
      return {
        ...state,
        inProgress: true
      };
    case 'ASYNC_END':
      return {
        ...state,
        inProgress: false
      };
  }

  return {
    ...state
  };
};
