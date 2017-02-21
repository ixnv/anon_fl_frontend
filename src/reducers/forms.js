import {UPDATE_FORM_FIELD, CLEAR_FORM, ORDER_TAG_ADD, ORDER_TAG_REMOVE, ORDER_CHAT_SEND_MESSAGE} from './../constants/ActionTypes';

const initialState = {
  forms: {
    sign_up: {
      email: '',
      username: '',
      password: ''
    },
    sign_in: {
      username: '',
      password: ''
    },
    create_order: {
      title: '',
      description: '',
      price: 0,
      category: 0,
      tags: [],
      tagInputValue: ''
    },
    send_message: {
      message: ''
    }
  }
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
      const forms = Object.assign({}, state.forms, {
        [action.formName]: initialState.forms[action.formName]
      });

      return {
        ...state,
        forms
      }
    }
    case ORDER_TAG_ADD: {
      const forms = state.forms;
      forms.create_order.tags = forms.create_order.tags.concat([action.tag]);
      forms.create_order.tagInputValue = '';
      return {
        ...state,
        forms
      };
    }
    case ORDER_TAG_REMOVE: {
      const tags = state.forms.create_order.tags;
      const index = tags.map(i => i.id === action.id).indexOf(true);
      tags.splice(index);

      const forms = state.forms;
      forms.create_order.tags = tags.slice();

      return {
        ...state,
        forms
      }
    }
    case ORDER_CHAT_SEND_MESSAGE: {
      const forms = Object.assign({}, state.forms, {
        send_message: {
          message: ''
        }
      });

      return {
        ...state,
        forms
      };
    }
    default:
      return {
        ...state
      };
  }
}
