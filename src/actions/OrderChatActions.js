import {ORDER_CHAT_FETCH, ORDER_CHAT_SEND_MESSAGE, ORDER_CHAT_UNLOAD, ORDER_CHAT_ALLOW_ACCESS,
  ORDER_CHAT_NEW_MESSAGE_RECEIVED, ORDER_CHAT_MARK_AS_READ_IF_ANY
} from "../constants/ActionTypes";
import {OrderChat} from "../api/resources";

export const orderChatFetch = (payload, user_id) => ({
  type: ORDER_CHAT_FETCH,
  payload,
  user_id
});

export const orderChatSendMessage = (order_id, message) => ({
  type: ORDER_CHAT_SEND_MESSAGE,
  payload: OrderChat.sendMessage(order_id, message)
});

export const orderChatUnload = () => ({
  type: ORDER_CHAT_UNLOAD
});

export const orderChatAllowAccess = () => ({
  type: ORDER_CHAT_ALLOW_ACCESS
});

export const orderChatNewMessageReceived = message => ({
  type: ORDER_CHAT_NEW_MESSAGE_RECEIVED,
  message
});

export const orderChatMarkAsReadIfAny = () => ({
  type: ORDER_CHAT_MARK_AS_READ_IF_ANY
});
