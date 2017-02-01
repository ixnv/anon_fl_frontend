import {ORDER_LIST_FETCH, ORDER_LIST_UNLOAD, ORDER_GET, ORDER_UNLOAD, ORDER_CREATE,
  ORDER_CONTRACTOR_LIST_FETCH, ORDER_CONTRACTOR_LIST_UNLOAD, ORDER_CUSTOMER_LIST_FETCH, ORDER_CUSTOMER_LIST_UNLOAD,
  APPLY, APPLICATION_CANCEL, APPLICATION_ACCEPT, APPLICATION_DECLINE} from './../constants/ActionTypes';


const initialState = {
  orders: [],
  order: {},
  contractor: [],
  customer: [],
  inProgress: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ORDER_CREATE:
      return {
        ...state,
        errors: action.error ? action.payload.data : null,
        createdOrder: action.error ? {}: action.payload
      };
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
    case APPLICATION_DECLINE:
    case APPLICATION_ACCEPT: {
      const order = Object.assign({}, state.order, {});

      for (let i = 0; i < order.application_list.length; i++) {
        if (action.payload.id === order.application_list[i].id) {
          order.application_list[i] = action.payload;
          break;
        }
      }

      return {
        ...state,
        order
      }
    }
    case APPLICATION_CANCEL:
    case APPLY: {
      const order = Object.assign({}, state.order, {
        application: action.error ? {}: action.payload
      });
      return {
        ...state,
        order
      };
    }
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
