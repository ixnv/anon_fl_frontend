import * as types from '../constants/ActionTypes';

export const categoriesListFetch = (payload) => {
  return {
    type: types.CATEGORIES_FETCH,
    payload
  };
};

export const categoriesListUnload = () => {
  return {
    type: types.CATEGORIES_UNLOAD
  }
};

export const categoriesListToggle = () => {
  return {
    type: types.CATEGORIES_TOGGLE
  }
};
