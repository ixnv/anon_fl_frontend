import React from "react";
import {connect} from "react-redux";
import SignInModal from "../components/Auth/SignInModal";
import {updateFormField, clearForm} from "../actions/FormActions";
import {login} from "../actions/AuthActions";
import {hideModal} from "../actions/ModalActions";

const formName = 'sign_in';

const mapStateToProps = state => ({
  ...state.auth
});

const mapDispatchToProps = dispatch => ({
  login: (username, password) => {
    const action = login(username, password);
    action.onSuccess = () => dispatch(hideModal());
    dispatch(action);
  },
  updateUsernameField: (email) => dispatch(updateFormField(formName, 'username', email)),
  updatePasswordField: (password) => dispatch(updateFormField(formName, 'password', password)),
  clearForm: (formName) => dispatch(clearForm(formName))
});

class SignInModalContainer extends React.Component {
  componentWillUnmount() {
    this.props.clearForm(formName);
  }

  render() {
    return (
      <SignInModal {...this.props}/>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInModalContainer);
export { SignInModalContainer as SignInModalContainer};
