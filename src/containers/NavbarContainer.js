import React from "react";
import NavBar from "../components/Navbar";
import {showModal} from "../actions/ModalActions";
import {logout} from "../actions/AuthActions";
import {LoggedInView, GuestView} from "../components/Navbar";
import {SIGN_IN_MODAL, SIGN_UP_MODAL} from '../constants/ModalTypes';
import {connect} from "react-redux";
import { browserHistory } from 'react-router'
import {webSocketEmitEvent} from "../actions/WebsocketActions";

const mapStateToProps = state => ({
  currentUser: state.users.currentUser,
  unreadAmount: state.notifications.unreadAmount
});

const mapDispatchToProps = dispatch => ({
  onSignInModalRequestClick: () => dispatch(showModal(SIGN_IN_MODAL)),
  onSignUpModalRequestClick: () => dispatch(showModal(SIGN_UP_MODAL)),
  onLogout: () => {
    dispatch(logout());
    dispatch(webSocketEmitEvent('leave', {}));
    browserHistory.push('/');
  }
});

class NavbarContainer extends React.Component {
  render() {
    const loggedIn = this.props.currentUser && this.props.currentUser.loggedIn;

    return (
      <NavBar>
        {!loggedIn && (
          <GuestView
            onSignInModalRequestClick={this.props.onSignInModalRequestClick}
            onSignUpModalRequestClick={this.props.onSignUpModalRequestClick}/>
        )}

        {loggedIn && (
          <LoggedInView unreadAmount={this.props.unreadAmount} username={this.props.currentUser.username} onLogout={this.props.onLogout}/>
        )}
      </NavBar>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer);
export { NavbarContainer as NavbarContainer };
