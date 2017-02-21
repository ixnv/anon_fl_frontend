import {ORDER_CHAT_FETCH, ORDER_CHAT_UNLOAD, ORDER_CHAT_ALLOW_ACCESS, ORDER_CHAT_NEW_MESSAGE_RECEIVED} from './../constants/ActionTypes';
import {
  ORDER_CHAT_SEND_MESSAGE, ORDER_CHAT_MARK_AS_READ_IF_ANY, ASYNC_START,
  ASYNC_END
} from "../constants/ActionTypes";

const initialState = {
  messages: [],
  hasAccessToChat: false,
  unreadMessagesCount: 0,
  currentChatId: 0,
  inProgress: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ASYNC_START: {
      return {
        ...state,
        inProgress: true
      }
    }
    case ASYNC_END: {
      return {
        ...state,
        inProgress: false
      };
    }
    case ORDER_CHAT_FETCH: {
      let messages = [];
      let unreadMessagesCount = 0;
      let currentChatId = 0;

      if (!!action.payload.results) {
        messages = action.payload.error ? []: action.payload.results.reverse();
        currentChatId = messages[0].chat_id;
        unreadMessagesCount = messages.filter(message => !message.is_read && message.sender_id !== action.user_id).length;
      }

      return {
        ...state,
        messages,
        unreadMessagesCount,
        currentChatId,
        inProgress: false
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
        messages: state.messages.concat([action.message]),
        unreadMessagesCount: state.unreadMessagesCount + 1
      };
    }
    case ORDER_CHAT_SEND_MESSAGE: {
      return {
        ...state,
        messages: state.messages.concat([action.payload]),
        inProgress: false
      };
    }
    case ORDER_CHAT_MARK_AS_READ_IF_ANY: {
      if (!state.unreadMessagesCount) {
        return {
          ...state
        };
      }

      const messages = state.messages.slice();

      messages.map(message => message.is_read = true);

      return {
        ...state,
        messages,
        unreadMessagesCount: 0
      };
    }
    default:
      return {
        ...state
      };
  }
}
