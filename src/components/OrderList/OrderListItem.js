import React from 'react';
import {Link} from 'react-router';
import TagsList from '../TagsList';


const OrderListItem = ({order}) => {
  return (
    <li className="list-group-item">
      <div className="order-list-item">
        <div className="order-list-item__heading">
          <div className="order-list-item__title-wrap">
            <Link className="order-list-item__title" to={`orders/${order.id}`}>{order.title}</Link>
          </div>
          <div className="order-list-item__details">
            <span className="order-list-item__details-date">{order.created_at}</span>
          </div>
          <TagsList tags={order.tags}/>
        </div>
        <aside className="order-list-item__price">{order.price / 100} руб.</aside>
      </div>
    </li>
  );
};

export default OrderListItem;
