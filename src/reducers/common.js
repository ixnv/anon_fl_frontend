import {APP_LOADED} from './../constants/ActionTypes';

const initialState = {
  appLoaded: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case APP_LOADED:
      return {
        ...state,
        appLoaded: true
      };
  }

  return {
    ...state
  };
};
