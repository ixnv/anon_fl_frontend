import {SHOW_MODAL, HIDE_MODAL} from './../constants/ActionTypes';

const initialState = {
  hideModal: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        modalType: action.modalType
      };
    case HIDE_MODAL:
    default:
      return initialState;
  }
};
