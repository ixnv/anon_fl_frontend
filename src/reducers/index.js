import {combineReducers} from "redux";
import { routerReducer } from "react-router-redux";
import {reducer as toastrReducer} from 'react-redux-toastr'
import orders from './orders';
import categories from './categories';
import modals from './modals';
import auth from './auth';
import forms from './forms';
import users from './users';

export const reducers = combineReducers({
  routing: routerReducer,
  toastr: toastrReducer,
  orders,
  categories,
  auth,
  forms,
  modals,
  users
});
