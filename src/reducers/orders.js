import {ORDER_LIST_FETCH, ORDER_LIST_UNLOAD, ORDER_GET, ORDER_UNLOAD} from './../constants/ActionTypes';

const initialState = {
  orders: [],
  order: {}
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
  }

  return {
    ...state
  };
};
