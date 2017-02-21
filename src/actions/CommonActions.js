import {APP_LOADED, SET_CURRENT_PAGE} from '../constants/ActionTypes';

export const appLoaded = () => ({
  type: APP_LOADED
});

export const setCurrentPage = currentPage => ({
  type: SET_CURRENT_PAGE,
  currentPage
});
