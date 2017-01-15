import React from 'react';
import {Modal, FormGroup, FormControl, Button} from 'react-bootstrap';

const SignInModal = (props) => {
  return (
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Войти</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form>
          <FormGroup>
            <FormControl
              type="text"
              value={props.value}
              placeholder="Эл. почта"/>
          </FormGroup>
          <FormGroup>
            <FormControl
              type="text"
              value={props.value}
              placeholder="Пароль"/>
          </FormGroup>
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={props.close}>Отмена</Button>
        <Button bsStyle="primary">Войти</Button>
      </Modal.Footer>

    </Modal.Dialog>
  );
};

export default SignInModal;
