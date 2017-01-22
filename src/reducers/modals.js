import {SHOW_MODAL, HIDE_MODAL} from './../constants/ActionTypes';

const initialState = {
  hideModal: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        modalType: action.modalType,
        hideModal: false
      };
    case HIDE_MODAL:
      return {
        ...state,
        hideModal: true
      };
  }

  return {...state};
};
