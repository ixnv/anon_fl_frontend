import React from "react";
import ModalContainer from "../containers/ModalContainer";
import NavbarContainer from "../containers/NavbarContainer";
import ReduxToastr from 'react-redux-toastr'
import {appLoaded} from '../actions/CommonActions';
import 'react-redux-toastr/src/styles/index.scss'
import "../stylesheets/main.scss";
import {connect} from "react-redux";


const mapDispatchToProps = dispatch => ({
  appLoaded: () => dispatch(appLoaded())
});

class App extends React.Component {
  componentWillMount() {
    this.props.appLoaded();
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

export default connect(() => ({}), mapDispatchToProps)(App);
export { App as App };
