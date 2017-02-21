import {LOGIN, REGISTER} from './../constants/ActionTypes';
import {UPDATE_FORM_FIELD, CLEAR_FORM} from "../constants/ActionTypes";

const initialState = {
  inProgress: false,
  errors: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
    case REGISTER:
      return {
        ...state,
        errors: action.error ? action.payload.data : null
      };
    case UPDATE_FORM_FIELD:
      return {
        ...state,
        [action.key]: action.value
      };
    case CLEAR_FORM:
      return {
        ...state,
        inProgress: false
      };
    case 'ASYNC_START':
      return {
        ...state,
        inProgress: true
      };
    case 'ASYNC_END':
      return {
        ...state,
        inProgress: false
      };
    default:
      return initialState;
  }
};
