import {WEBSOCKET_CONNECT, WEBSOCKET_DISCONNECT} from './../constants/ActionTypes';
import {WEBSOCKET_ATTACH_LISTENER, WEBSOCKET_EMIT_EVENT} from "../constants/ActionTypes";

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
    case WEBSOCKET_EMIT_EVENT: {
      state.socket.emit(action.eventKey, action.data);
      return {
        ...state
      };
    }
  }

  return {
    ...state
  };
};
