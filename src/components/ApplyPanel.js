import React from 'react';
import {Button, Alert} from 'react-bootstrap';
import {ORDER_STATUS_NEW, ORDER_STATUS_IN_PROCESS, ORDER_STATUS_COMPLETED_WITH_SUCCESS} from '../constants/OrderStatuses';
import {ORDER_APPLICATION_STATUS_WITHDRAWN} from "../constants/OrderApplicationStatus";


const ApplyPanel = ({currentUser, order, application, onApply, onCancelApplication}) => {
  if (!currentUser.loggedIn) {
    return null;
  }

  const is_owner = order && order.customer_id === currentUser.id;
  const is_applicant = application && application.applicant_id === currentUser.id && application.status !== ORDER_APPLICATION_STATUS_WITHDRAWN;

  if (!(order && application)) {
    return null;
  }

  if (is_owner) {
    switch (order.status) {
      case ORDER_STATUS_NEW:
        return (
          <Alert bsStyle="success">
            <p>Заказ ожидает исполнителя</p>
          </Alert>
        );
      case ORDER_STATUS_IN_PROCESS:
        return (
          <Alert bsStyle="success">
            <p>Заказ выполняется пользователем {order.contractor.username}</p>
          </Alert>
        );
      case ORDER_STATUS_COMPLETED_WITH_SUCCESS:
        return (
          <Alert bsStyle="success">
            <p>Заказ успешно завершен</p>
          </Alert>
        );
    }
  }

  if (!is_owner && order.contractor.id === currentUser.id) {
    return (
      <Alert bsStyle="success">
        <p>Вы выполняете данный заказ</p>
      </Alert>
    );
  }

  if (is_applicant) {
    return (
      <Alert bsStyle="success">
        <p>Вы подали заявку на исполнение</p>
        <Button bsStyle="danger" onClick={() => onCancelApplication(order.id)}>Отменить заявку</Button>
      </Alert>
    );
  }

  if (!is_owner && order.status !== ORDER_STATUS_NEW) {
    return (
      <Alert bsStyle="info">
        <p>Заказ находится в архиве или исполняется</p>
      </Alert>
    );
  }

  return (
    <Alert bsStyle="info">
      <p>После подачи заявки на исполнение, заказчик примет решение, будете ли вы исполнять заказ</p>
      <Button bsStyle="primary" onClick={() => onApply(order.id, currentUser)}>Подать заявку</Button>
    </Alert>
  );
};

export default ApplyPanel;
