import {APPLY, APPLY_SUCCESS, APPLICATION_CANCEL, APPLICATION_DECLINE, APPLICATION_ACCEPT} from '../constants/ActionTypes';
import {
  ORDER_APPLICATION_APPROVED, ORDER_APPLICATION_DECLINED,
  ORDER_APPLICATION_REQUEST_RECEIVED
} from "../constants/WebSocketsEvents";

export const applyForOrder = (payload) => ({
  type: APPLY,
  payload
});

export const applyForOrderSuccess = order_id => ({
  type: APPLY_SUCCESS,
  order_id
});

export const cancelApplication = payload => ({
  type: APPLICATION_CANCEL,
  payload
});

export const declineApplication = (payload) => ({
  type: APPLICATION_DECLINE,
  payload
});

export const acceptApplication = (payload) => ({
  type: APPLICATION_ACCEPT,
  payload
});

export const orderApplicationRequestReceived = application => ({
  type: ORDER_APPLICATION_REQUEST_RECEIVED,
  application
});

export const orderApplicationApprovedReceived = application => ({
  type: ORDER_APPLICATION_APPROVED,
  application
});

export const orderApplicationDeclinedReceived = application => ({
  type: ORDER_APPLICATION_DECLINED,
  application
});
