import {CATEGORIES_FETCH} from './../constants/ActionTypes';

const initialState = {
  categories: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CATEGORIES_FETCH:
      return {
        ...state,
        categories: action.payload.results
      }
  }

  return {
    ...state
  };
};
