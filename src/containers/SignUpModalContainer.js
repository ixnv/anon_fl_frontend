import React from "react";
import {connect} from "react-redux";
import SignUpModal from "../components/Auth/SignUpModal";
import {updateFormField, clearForm} from "../actions/FormActions";
import {register} from "../actions/AuthActions";
import {hideModal} from "../actions/ModalActions";

const formName = 'sign_up';

const mapStateToProps = state => ({
  ...state.auth,
  ...state.forms.forms.sign_up
});

const mapDispatchToProps = dispatch => ({
  register: (email, username, password) => {
    const action = register(email, username, password);
    action.onSuccess = () => dispatch(hideModal());
    dispatch(action);
  },
  updateEmailField: (email) => dispatch(updateFormField(formName, 'email', email)),
  updateUsernameField: (email) => dispatch(updateFormField(formName, 'username', email)),
  updatePasswordField: (password) => dispatch(updateFormField(formName, 'password', password)),
  clearForm: (formName) => dispatch(clearForm(formName))
});

class SignUpModalContainer extends React.Component {
  componentWillUnmount() {
    this.props.clearForm(formName);
  }

  render() {
    return (
      <SignUpModal {...this.props}/>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpModalContainer);
export { SignUpModalContainer as SignUpModalContainer};
