import * as types from './../constants/ActionTypes';

const initialState = {
  categories: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CATEGORIES_FETCH:
      return {
        ...state,
        categories: action.payload.results
      }
  }

  return {
    ...state
  };
};
