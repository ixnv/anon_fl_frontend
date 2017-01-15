import {SHOW_MODAL, HIDE_MODAL} from '../constants/ActionTypes';

export const showModal = (modalType) => ({
  type: SHOW_MODAL,
  modalType
});

export const hideModal = () => ({
  type: HIDE_MODAL
});
