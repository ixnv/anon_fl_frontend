import {combineReducers} from "redux";
import { routerReducer } from "react-router-redux";
import {reducer as toastrReducer} from 'react-redux-toastr'
import common from './common';
import orders from './orders';
import chats from './chats';
import categories from './categories';
import modals from './modals';
import auth from './auth';
import forms from './forms';
import users from './users';
import tags from './tags';
import websocket from './websocket';
import settings from "./settings";
import notifications from "./notifications";

export const reducers = combineReducers({
  routing: routerReducer,
  toastr: toastrReducer,
  websocket,
  common,
  notifications,
  orders,
  chats,
  categories,
  auth,
  forms,
  modals,
  users,
  settings,
  tags
});
