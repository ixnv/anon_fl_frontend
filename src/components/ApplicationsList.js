import React from 'react';
import shortid from 'shortid';
import {Table, Button} from 'react-bootstrap';
import {DateUtil} from "../util";
import {ORDER_APPLICATION_STATUS_NEW, ORDER_APPLICATION_STATUS_DECLINED} from "../constants/OrderApplicationStatus";


const ApplicationsList = ({currentUser, order, onApplicationAccept, onApplicationDecline}) => {
  const {application_list} = order;

  if (!application_list || !application_list.length || order.customer_id !== currentUser.id) {
    return null;
  }

  const renderActionButton = (application) => {
    switch (application.status) {
      case ORDER_APPLICATION_STATUS_NEW:
        return (
          <div>
            <Button bsStyle="primary" onClick={() => onApplicationAccept(application.id)}>Нанять</Button>
            <Button bsStyle="danger" onClick={() => onApplicationDecline(application.id)}>Отказать</Button>
          </div>
        );
      case ORDER_APPLICATION_STATUS_DECLINED:
        return (
          <div>
            Заявителю было отказано
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
