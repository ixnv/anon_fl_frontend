import {ORDER_CHAT_FETCH, ORDER_CHAT_UNLOAD, ORDER_CHAT_ALLOW_ACCESS, ORDER_CHAT_NEW_MESSAGE_RECEIVED} from './../constants/ActionTypes';
import {ORDER_CHAT_SEND_MESSAGE, ORDER_CHAT_MARK_AS_READ_IF_ANY} from "../constants/ActionTypes";

const initialState = {
  messages: [],
  hasAccessToChat: false,
  unreadMessagesCount: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ORDER_CHAT_FETCH: {
      let messages = [];
      let unreadMessagesCount = 0;

      if (!!action.payload.results) {
        messages = action.payload.error ? []: action.payload.results.reverse();
        unreadMessagesCount = messages.filter(message => !message.is_read && message.sender_id !== action.user_id).length;
      }

      return {
        ...state,
        messages,
        unreadMessagesCount
      };
    }
    case ORDER_CHAT_UNLOAD: {
      return {
        ...state,
        messages: [],
        unreadMessagesCount: 0
      }
    }
    case ORDER_CHAT_ALLOW_ACCESS: {
      return {
        ...state,
        hasAccessToChat: true
      }
    }
    case ORDER_CHAT_NEW_MESSAGE_RECEIVED: {
      return {
        ...state,
        messages: state.messages.concat([action.message])
      }
    }
    case ORDER_CHAT_SEND_MESSAGE: {
      return {
        ...state,
        messages: state.messages.concat([action.payload])
      }
    }
    case ORDER_CHAT_MARK_AS_READ_IF_ANY: {
      const messages = state.messages.slice();

      messages.map(message => message.is_read = true);

      return {
        ...state,
        messages,
        unreadMessagesCount: 0
      }
    }
    default:
      return {
        ...state
      };
  }
}
