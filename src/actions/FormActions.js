import {UPDATE_FORM_FIELD, CLEAR_FORM} from '../constants/ActionTypes';

export const updateFormField = (formName, key, value) => ({
  type: UPDATE_FORM_FIELD,
  formName,
  key,
  value
});

export const clearForm = (formName) => ({
  type: CLEAR_FORM,
  formName
});
