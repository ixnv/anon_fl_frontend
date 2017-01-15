import React from "react";
import {connect} from "react-redux";

import {SIGN_IN_MODAL, SIGN_UP_MODAL} from '../constants/ModalTypes';
import SignInModal from "../components/Auth/SignInModal";
import SignUpModal from "../components/Auth/SignUpModal";
import {hideModal} from "../actions/ModalActions";

const mapStateToProps = state => ({
  modalType: state.modals.modalType,
  hideModal: state.modals.hideModal
});

const mapDispatchToProps = dispatch => ({
  close: () => dispatch(hideModal())
});

const COMPONENTS = {
  [SIGN_IN_MODAL]: SignInModal,
  [SIGN_UP_MODAL]: SignUpModal
};

class ModalContainer extends React.Component {
  render() {
    if (!this.props.modalType || this.props.hideModal) {
      return null;
    }

    const ModalComponent = COMPONENTS[this.props.modalType];
    return (
      <ModalComponent close={this.props.close}/>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);
export { ModalContainer as ModalContainer};
