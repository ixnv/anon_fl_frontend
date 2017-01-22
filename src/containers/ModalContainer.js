import React from "react";
import {connect} from "react-redux";
import {SIGN_IN_MODAL, SIGN_UP_MODAL} from '../constants/ModalTypes';
import SignInModalContainer from "../containers/SignInModalContainer";
import SignUpModalContainer from "../containers/SignUpModalContainer";
import {hideModal} from "../actions/ModalActions";

const mapStateToProps = state => ({
  modalType: state.modals.modalType,
  hideModal: state.modals.hideModal
});

const mapDispatchToProps = dispatch => ({
  close: () => dispatch(hideModal())
});

const CONTAINERS = {
  [SIGN_IN_MODAL]: SignInModalContainer,
  [SIGN_UP_MODAL]: SignUpModalContainer
};

class ModalContainer extends React.Component {
  render() {
    if (!this.props.modalType || this.props.hideModal) {
      return null;
    }

    const ModalContainer = CONTAINERS[this.props.modalType];
    return (
      <ModalContainer close={this.props.close}/>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);
export { ModalContainer as ModalContainer};
