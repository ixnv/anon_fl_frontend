import React from "react";
import ModalContainer from "../containers/ModalContainer";
import NavbarContainer from "../containers/NavbarContainer";
import "../stylesheets/main.scss";


export default class App extends React.Component {
  render() {
    return (
      <div>
        <ModalContainer/>
        <NavbarContainer/>
        {this.props.children}
      </div>
    );
  }
}
