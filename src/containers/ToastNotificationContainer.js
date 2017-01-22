import React from 'react';
import {connect} from "react-redux";
import {ToastContainer} from 'react-toastr';


const mapStateToProps = state => ({
  ...state.toastr
});

const mapDispatchToProps = dispatch => ({
  onClick: () => {}
});


const ToastMessageFactory = React.createFactory(ToastContainer.ToastMessage.animation);

class ToastNotificationContainer extends React.Component {
  addAlert () {
    this.refs.container.success(
      "Welcome welcome welcome!!",
      "You are now home my friend. Welcome home my friend.", {
        timeOut: 30000,
        extendedTimeOut: 10000
      });
    window.open("http://youtu.be/3SR75k7Oggg");
  }

  render () {
    return (
      <div>
        <ToastContainer ref="container"
                        toastMessageFactory={ToastMessageFactory}
                        className="toast-top-right" />
        <button onClick={this.addAlert}>Foo</button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToastNotificationContainer);
export { ToastNotificationContainer as ToastNotificationContainer};
