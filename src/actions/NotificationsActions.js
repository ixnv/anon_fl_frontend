import {NEW_UNREAD_NOTIFICATIONS} from "../constants/WebSocketsEvents";
import {READ_NOTIFICATIONS} from "../constants/ActionTypes";

export const newUnreadNotifications = notifications => ({
  type: NEW_UNREAD_NOTIFICATIONS,
  notifications
});

export const readNotifications = () => ({
  type: READ_NOTIFICATIONS
});
