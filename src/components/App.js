import React from "react";
import ModalContainer from "../containers/ModalContainer";
import NavbarContainer from "../containers/NavbarContainer";
import ReduxToastr from 'react-redux-toastr'
import {appLoaded} from '../actions/CommonActions';
import {webSocketConnect, webSocketAttachListener} from "../actions/WebsocketActions";
import {ORDER_CHAT_NEW_MESSAGE} from "../constants/WebSocketsEvents";
import 'react-redux-toastr/src/styles/index.scss'
import "../stylesheets/main.scss";
import {connect} from "react-redux";
import {orderChatNewMessageReceived} from "../actions/OrderChatActions";


const mapStateToProps = state => ({
  currentUser: state.users.currentUser
});

class App extends React.Component {
  componentWillMount() {
    this.props.dispatch(appLoaded());
  }

  componentWillUpdate(nextProps, nextState) {
    if (!this.props.currentUser.loggedIn && nextProps.currentUser.loggedIn) {
      this.props.dispatch(webSocketConnect(JSON.parse(window.localStorage.getItem('currentUser')).token));
      this.props.dispatch(webSocketAttachListener(ORDER_CHAT_NEW_MESSAGE, (message) => {
        this.props.dispatch(orderChatNewMessageReceived(message));
      }));
    }
  }

  render() {
    return (
      <div>
        <ReduxToastr
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          timeout="2000"
        />
        <ModalContainer/>
        <NavbarContainer/>
        {this.props.children}
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
export { App as App };
