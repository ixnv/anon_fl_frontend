import {combineReducers} from "redux";
import orders from './orders';
import categories from './categories';
import modals from './modals';
import { routerReducer } from "react-router-redux";

export const reducers = combineReducers({
  routing: routerReducer,
  orders,
  categories,
  modals
});
