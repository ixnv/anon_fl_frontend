import {APP_LOADED, SET_CURRENT_PAGE} from './../constants/ActionTypes';

const initialState = {
  appLoaded: false,
  currentPage: {
    section: '',
    id: 0
  }
};

// FIXME: use reselect
export let currentPage = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case APP_LOADED:
      return {
        ...state,
        appLoaded: true
      };
    case SET_CURRENT_PAGE: {
      currentPage = action.currentPage;
      return {
        ...state,
        currentPage
      }
    }
  }

  return {
    ...state
  };
};
