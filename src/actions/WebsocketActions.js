import {WEBSOCKET_CONNECT, WEBSOCKET_ATTACH_LISTENER, WEBSOCKET_EMIT_EVENT} from "../constants/ActionTypes";
import io from 'socket.io-client';

export const webSocketConnect = (userToken, events) => {
  const socket = io(__WS_URL, { query: `token=${userToken}`});

  events.map((event) => {
    socket.on(event.key, event.handler);
  });

  return {
    type: WEBSOCKET_CONNECT,
    socket
  };
};

export const webSocketEmitEvent = (eventKey, data) => ({
  type: WEBSOCKET_EMIT_EVENT,
  eventKey,
  data
});
