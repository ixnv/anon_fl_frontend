import {USER_NOTIFICATIONS_LOAD, USER_NOTIFICATIONS_UNLOAD, USER_NOTIFICATIONS_SAVE, USER_NOTIFICATIONS_UPDATE_CATEGORIES} from "../constants/ActionTypes";
import {UserNotificationsSettings} from "../api/resources";

export const loadUserNotificationSettings = () => ({
  type: USER_NOTIFICATIONS_LOAD,
  payload: UserNotificationsSettings.get()
});

export const saveUserNotificationsSettings = settings => ({
  type: USER_NOTIFICATIONS_SAVE,
  payload: UserNotificationsSettings.update(settings)
});

export const unloadSettings = () => ({
  type: USER_NOTIFICATIONS_UNLOAD
});

// FIXME: what a long beautiful name, innit?
export const updateUserNotificationsCategoriesSettings = (category_id, is_addition) => ({
  type: USER_NOTIFICATIONS_UPDATE_CATEGORIES,
  category_id,
  is_addition
});
