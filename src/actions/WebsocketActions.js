import {WEBSOCKET_CONNECT, WEBSOCKET_ATTACH_LISTENER} from "../constants/ActionTypes";
import io from 'socket.io-client';

export const webSocketConnect = userToken => ({
  type: WEBSOCKET_CONNECT,
  socket: io(__WS_URL, { query: `token=${userToken}`})
});

export const webSocketAttachListener = (eventKey, listener) => ({
  type: WEBSOCKET_ATTACH_LISTENER,
  eventKey,
  listener
});
