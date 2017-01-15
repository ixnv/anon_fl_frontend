import React from "react";
import Navbar from "../components/Navbar";
import {showModal} from "../actions/ModalActions";
import {LoggedInView, GuestView} from "../components/Navbar";
import {SIGN_IN_MODAL, SIGN_UP_MODAL} from '../constants/ModalTypes';
import {connect} from "react-redux";

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  onSignInModalRequestClick: () => dispatch(showModal(SIGN_IN_MODAL)),
  onSignUpModalRequestClick: () => dispatch(showModal(SIGN_UP_MODAL)),
  onSignOut: () => alert('implement me')
});

class NavbarContainer extends React.Component {
  // TODO: add user state (login info, notifications, etc)
  render() {
    return (
      <Navbar>
        <GuestView
          onSignInModalRequestClick={this.props.onSignInModalRequestClick}
          onSignUpModalRequestClick={this.props.onSignUpModalRequestClick}/>
      </Navbar>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer);
export { NavbarContainer as NavbarContainer};
