import React from "react";
import ModalContainer from "../containers/ModalContainer";
import NavbarContainer from "../containers/NavbarContainer";
import ReduxToastr from 'react-redux-toastr'
import 'react-redux-toastr/src/styles/index.scss'
import "../stylesheets/main.scss";


export default class App extends React.Component {
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
