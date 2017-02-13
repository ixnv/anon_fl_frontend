import {WEBSOCKET_CONNECT, WEBSOCKET_DISCONNECT} from './../constants/ActionTypes';
import {WEBSOCKET_ATTACH_LISTENER} from "../constants/ActionTypes";

const initialState = {
  socket: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case WEBSOCKET_CONNECT:
      return {
        ...state,
        socket: action.socket
      };
    case WEBSOCKET_DISCONNECT:
      return {
        ...initialState
      };
    case WEBSOCKET_ATTACH_LISTENER: {
      state.socket.on(action.eventKey, action.listener);

      return {
        ...state
      }
    }
  }

  return {
    ...state
  };
};
