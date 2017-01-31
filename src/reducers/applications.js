import {APPLY, APPLICATION_CANCEL, APPLICATION_ACCEPT, APPLICATION_DECLINE} from '../constants/ActionTypes';

const initialState = {
  application: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case APPLY:
    case APPLICATION_CANCEL:
    case APPLICATION_ACCEPT:
    case APPLICATION_DECLINE:
      return {
        ...state,
        errors: action.error ? action.payload: {},
        application: action.error ? {}: action.payload
      };
    default:
      return {
        ...state
      };
  }
};
