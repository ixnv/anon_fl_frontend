import React from 'react';
import TagsList from './TagsList';
import AttachmentsList from './AttachmentsList';
import {Glyphicon} from 'react-bootstrap';
import {DateUtil} from "../util";
import OrderEditLink from './OrderEditLink';


const Order = ({children, order, currentUser}) => {
  if (!Object.keys(order).length) {
    return null;
  }

  return (
    <div className="panel panel-default">
      <div className="panel-body">
        <OrderEditLink order={order} currentUser={currentUser}/>
        <header className="order-list-item-header">
          <div className="order-list-item">
            <div className="order-list-item__heading">
              <div className="order-list-item__title-wrap">
                <span className="order-list-item__title">{order.title}</span>
              </div>
              <div className="order-details">
                <span className="order-details__customer">
                  <Glyphicon className="order-details__customer-icon" glyph="user" />
                  <span className="order-details__customer-name">{order.customer.username}</span>
                </span>
                <span className="order-details__date">
                  <Glyphicon className="order-details__customer-icon" glyph="time" />
                  {DateUtil.formatDate(order.created_at)}
                </span>
              </div>
              <TagsList tags={order.tags}/>
            </div>
            <aside className="order-list-item__price">
              {order.price / 100} руб.
            </aside>
          </div>
        </header>
        <hr/>
        <p className="order-list-item__description">
          {order.description}
        </p>
        <AttachmentsList attachments={order.attachments}/>

        {children}

      </div>
    </div>
  );
};

export default Order;
