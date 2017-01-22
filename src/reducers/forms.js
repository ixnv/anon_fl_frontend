import {UPDATE_FORM_FIELD, CLEAR_FORM} from './../constants/ActionTypes';

const initialState = {
  forms: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FORM_FIELD: {
      let prevForms = Object.assign({}, state.forms, {});
      if (!(action.formName in prevForms)) {
        prevForms[action.formName] = {
          [action.key]: action.value
        };
      } else {
        prevForms[action.formName][action.key] = action.value;
      }

      return {
        ...state,
        forms: prevForms
      };
    }
    case CLEAR_FORM: {
      let forms = state.forms;
      delete forms[action.formName];

      return {
        ...state,
        forms
      }
    }
    default:
      return {
        ...state
      };
  }
}
