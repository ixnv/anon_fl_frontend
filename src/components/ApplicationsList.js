import React from 'react';
import shortid from 'shortid';
import {Table, Button} from 'react-bootstrap';
import {DateUtil} from "../util";
import {ORDER_APPLICATION_STATUS_NEW, ORDER_APPLICATION_STATUS_DECLINED, ORDER_APPLICATION_STATUS_ACCEPTED} from "../constants/OrderApplicationStatus";
import {ORDER_STATUS_NEW} from "../constants/OrderStatuses";


const ApplicationsList = ({currentUser, order, onAcceptApplication, onDeclineApplication}) => {
  const {application_list} = order;

  if (!application_list || !application_list.length || order.customer_id !== currentUser.id || order.status !== ORDER_STATUS_NEW) {
    return null;
  }

  const renderActionButton = (application) => {
    switch (application.status) {
      case ORDER_APPLICATION_STATUS_NEW:
        return (
          <div>
            <Button bsStyle="primary" onClick={() => onAcceptApplication(order.id, application.id)}>Нанять</Button>
            <Button bsStyle="danger" onClick={() => onDeclineApplication(order.id, application.id)}>Отказать</Button>
          </div>
        );
      case ORDER_APPLICATION_STATUS_DECLINED:
        return (
          <div>
            Заявителю было отказано
          </div>
        );
      case ORDER_APPLICATION_STATUS_ACCEPTED:
        return (
          <div>
            Заявитель был принят
          </div>
        );
    }
  };

  return (
    <Table striped bordered condensed hover>
      <thead>
        <tr>
          <th>пользователь</th>
          <th>время</th>
          <th/>
        </tr>
      </thead>
      <tbody>
      {application_list.map(application => {
        return (
          <tr key={shortid.generate()}>
            <td>{application.applicant.username}</td>
            <td>{DateUtil.formatDate(application.created_at)}</td>
            <td>{renderActionButton(application)}</td>
          </tr>
        )
      })}
      </tbody>
    </Table>
  );
};

export default ApplicationsList;
