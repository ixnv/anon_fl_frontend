import {
  NEW_UNREAD_NOTIFICATIONS, ORDER_APPLICATION_APPROVED, ORDER_APPLICATION_DECLINED,
  ORDER_APPLICATION_REQUEST_RECEIVED
} from "../constants/WebSocketsEvents";
import {ORDER_CHAT_NEW_MESSAGE_RECEIVED, READ_NOTIFICATIONS} from "../constants/ActionTypes";
import {currentPage} from "./common";

const initialState = {
  notifications: [],
  unreadAmount: 0
};

export default (state = initialState, action) => {
  const handleNewNotification = (notification) => {
    const notifications = Array.isArray(notification) ? notification: [notification];
    return state.notifications.concat(notifications);
  };

  switch (action.type) {
    case NEW_UNREAD_NOTIFICATIONS: {
      const notifications = handleNewNotification(action.notifications);
      return {
        ...state,
        notifications,
        unreadAmount: notifications.filter(notification => !notification.is_read).length
      }
    }
    case READ_NOTIFICATIONS: {
      return {
        ...state,
        unreadAmount: 0
      }
    }
    case ORDER_CHAT_NEW_MESSAGE_RECEIVED: {
      // user on order page, nothing to do here
      if (currentPage.section === 'order' && +currentPage.id === action.message.order_id) {
        return {
          ...state
        }
      }

      const notifications = handleNewNotification(action.message);

      return {
        ...state,
        notifications,
        unreadAmount: state.unreadAmount + 1
      };
    }
    case ORDER_APPLICATION_APPROVED:
    case ORDER_APPLICATION_DECLINED:
    case ORDER_APPLICATION_REQUEST_RECEIVED: {
      const application = action.application;
      application.type = action.type;

      return {
        ...state,
        notifications: handleNewNotification(application),
        unreadAmount: state.unreadAmount + 1
      }
    }
    default:
      return {
        ...state
      };
  }
}
