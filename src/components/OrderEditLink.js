import React from 'react';
import {Glyphicon} from 'react-bootstrap';
import {Link} from 'react-router';


const OrderEditLink = ({order, currentUser}) => {
  if (!currentUser.loggedIn || (order && order.customer_id !== currentUser.id)) {
    return null;
  }

  return (
    <div className="order-edit-button">
      <Glyphicon glyph="edit"/>
      <Link className="order-edit-button__link" to={`/orders/${order.id}/edit`}>Редактировать</Link>
    </div>
  );
};

export default OrderEditLink;
