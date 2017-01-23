import {APP_LOADED} from './../constants/ActionTypes';

const initalState = {
  appLoaded: false
};

export default (state = initalState, action) => {
  switch (action.type) {
    case APP_LOADED:
      return {
        ...state,
        appLoaded: true
      };
  }

  return state;
};
