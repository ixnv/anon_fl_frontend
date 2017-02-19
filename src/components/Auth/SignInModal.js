import React from 'react';
import {Modal, FormGroup, FormControl, Button} from 'react-bootstrap';
import ErrorsList from '../ErrorsList';

const SignInModal = (props) => {
  const submitForm = (username, password) => ev => {
    ev.preventDefault();
    props.login(username, password);
  };

  const updateUsernameField = ev =>  props.updateUsernameField(ev.target.value);
  const updatePasswordField = ev => props.updatePasswordField(ev.target.value);

  return (
    <Modal show={true} onHide={props.close}>
      <Modal.Header>
        <Modal.Title>Войти</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ErrorsList errors={props.errors}/>
        <form onSubmit={submitForm(props.username, props.password)}>
          <FormGroup>
            <FormControl
              type="text"
              value={props.username}
              placeholder="Имя пользователя"
              onChange={updateUsernameField}
            />
          </FormGroup>
          <FormGroup>
            <FormControl
              type="password"
              value={props.password}
              placeholder="Пароль"
              onChange={updatePasswordField}
            />
          </FormGroup>
          <FormGroup>
            <Button type="submit" bsStyle="primary" disabled={props.inProgress}>Войти</Button>
            <Button onClick={props.close}>Отмена</Button>
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default SignInModal;
