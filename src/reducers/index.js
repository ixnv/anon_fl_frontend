import {combineReducers} from "redux";
import { routerReducer } from "react-router-redux";
import {reducer as toastrReducer} from 'react-redux-toastr'
import common from './common';
import orders from './orders';
import categories from './categories';
import modals from './modals';
import auth from './auth';
import forms from './forms';
import users from './users';
import tags from './tags';

export const reducers = combineReducers({
  routing: routerReducer,
  toastr: toastrReducer,
  common,
  orders,
  categories,
  auth,
  forms,
  modals,
  users,
  tags
});
