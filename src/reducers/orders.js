import * as types from './../constants/ActionTypes';

const initialState = {
  orders: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ORDER_LIST_FETCH:
      return {
        ...state,
        orders: action.payload.results
      }
  }

  return {
    ...state
  };
};
