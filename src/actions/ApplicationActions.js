import {APPLY, APPLY_SUCCESS, APPLICATION_CANCEL, APPLICATION_DECLINE, APPLICATION_ACCEPT} from '../constants/ActionTypes';

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
