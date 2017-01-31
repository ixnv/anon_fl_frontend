import {LOGIN, REGISTER, SET_CURRENT_USER, LOGOUT} from './../constants/ActionTypes';

const initialState = {
  currentUser: {
    loggedIn: false
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
    case REGISTER:
    case SET_CURRENT_USER:
      const currentUser = action.error ? {}: {
        username: action.payload.username,
        email: action.payload.email,
        loggedIn: true,
        id: action.payload.id
      };

      return {
        ...state,
        currentUser
      };
    case LOGOUT:
      return {
        ...state,
        currentUser: {}
      };
    default:
      return {
        ...state
      };
  }
}
