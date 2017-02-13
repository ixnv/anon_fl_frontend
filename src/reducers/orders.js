import {ORDER_LIST_FETCH, ORDER_LIST_UNLOAD, ORDER_GET, ORDER_UNLOAD, ORDER_CREATE,
  ORDER_CONTRACTOR_LIST_FETCH, ORDER_CONTRACTOR_LIST_UNLOAD, ORDER_CUSTOMER_LIST_FETCH, ORDER_CUSTOMER_LIST_UNLOAD,
  APPLY, APPLICATION_CANCEL, APPLICATION_ACCEPT, APPLICATION_DECLINE, ORDER_FILTER_UPDATE
} from './../constants/ActionTypes';
import {ORDER_FILTER_PROCESSED, ORDER_FILTER_RESET} from "../constants/ActionTypes";


const initialState = {
  orders: [],
  ordersOnServerCount: 0,
  order: {},
  contractor: [],
  customer: [],
  inProgress: false,
  filter: {
    categories: [],
    tag: '',
    pending: false,
    empty: true
  }
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
        orders: action.payload.results,
        ordersOnServerCount: action.payload.count
      };
    case ORDER_LIST_UNLOAD:
      return {
        ...state,
        orders: [],
        ordersOnServerCount: 0
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
        contractor: action.payload.results,
        ordersOnServerCount: action.payload.count
      };
    case ORDER_CUSTOMER_LIST_FETCH:
      return {
        ...state,
        customer: action.payload.results,
        ordersOnServerCount: action.payload.count
      };
    case ORDER_CONTRACTOR_LIST_UNLOAD:
      return {
        ...state,
        contractor: [],
        ordersOnServerCount: 0
      };
    case ORDER_CUSTOMER_LIST_UNLOAD:
      return {
        ...state,
        contractor: [],
        ordersOnServerCount: 0
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
    case ORDER_FILTER_UPDATE: {
      const filter = Object.assign({}, state.filter, {
        categories: action.filterType === 'category' ? action.param: state.filter.categories,
        tag: action.filterType === 'tag' ? action.param: state.filter.tag,
        pending: true
      });

      filter.empty = !(filter.categories.length || filter.tag);

      return {
        ...state,
        filter
      }
    }
    case ORDER_FILTER_RESET: {
      return {
        ...state,
        filter: initialState.filter
      }
    }
    case ORDER_FILTER_PROCESSED: {
      const filter = Object.assign({}, state.filter, {
        pending: false
      });

      return {
        ...state,
        filter
      }
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
