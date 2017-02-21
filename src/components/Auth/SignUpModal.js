import React from 'react';
import {Modal, FormGroup, FormControl, Button, HelpBlock} from 'react-bootstrap';
import ErrorsList from '../ErrorsList';

const SignUpModal = (props) => {
  const submitForm = (email, username, password) => ev => {
    ev.preventDefault();
    props.register(email, username, password);
  };

  const updateEmailField = ev =>  props.updateEmailField(ev.target.value);
  const updateUsernameField = ev =>  props.updateUsernameField(ev.target.value);
  const updatePasswordField = ev => props.updatePasswordField(ev.target.value);

  return (
    <Modal show={true} onHide={props.close}>
      <Modal.Header>
        <Modal.Title>Регистрация</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ErrorsList errors={props.errors}/>
        <form onSubmit={submitForm(props.email, props.username, props.password)}>
          <FormGroup>
            <FormControl
              type="text"
              value={props.email}
              placeholder="Эл. почта"
              onChange={updateEmailField}
              pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            />
            <HelpBlock>На эл. почту будут приходить оповещения по заказам</HelpBlock>
          </FormGroup>
          <FormGroup>
            <FormControl
              type="text"
              value={props.username}
              placeholder="Имя пользователя"
              onChange={updateUsernameField}
            />
            <HelpBlock>Латинские буквы и цифры</HelpBlock>
          </FormGroup>
          <FormGroup>
            <FormControl
              type="password"
              value={props.password}
              placeholder="Пароль"
              onChange={updatePasswordField}
            />
            <HelpBlock>Латинские буквы и цифры, длина не меньше 8 символов</HelpBlock>
          </FormGroup>
          <FormGroup>
            <Button type="submit" bsStyle="primary" disabled={props.inProgress}>Регистрация</Button>
            <Button onClick={props.close}>Отмена</Button>
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default SignUpModal;
