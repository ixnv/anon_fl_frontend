import {APPLY, APPLY_SUCCESS, APPLICATION_CANCEL} from '../constants/ActionTypes';

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
