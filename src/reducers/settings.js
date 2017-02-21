import {USER_NOTIFICATIONS_LOAD, USER_NOTIFICATIONS_UNLOAD, USER_NOTIFICATIONS_UPDATE_CATEGORIES} from "../constants/ActionTypes";

const initialState = {
  notifications: {
    categories: [],
    notify_on_email: false
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_NOTIFICATIONS_LOAD:
      return {
        ...state,
        notifications: action.error ? {}: action.payload
      };
    case USER_NOTIFICATIONS_UNLOAD:
      return {
        ...state,
        notifications: {}
      };
    case USER_NOTIFICATIONS_UPDATE_CATEGORIES: {
      const categories = state.notifications.categories.slice();
      if (action.is_addition) {
        categories.push(action.category_id);
      } else {
        categories.splice(categories.indexOf(action.category_id), 1);
      }

      const notifications = Object.assign({}, state.notifications, {categories});

      return {
        ...state,
        notifications
      }
    }
    default:
      return {
        ...state
      };
  }
}
