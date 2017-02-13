import React from 'react';
import {Link} from 'react-router';
import {Glyphicon} from 'react-bootstrap';
import TagsList from '../TagsList';
import {DateUtil} from '../../util';


const OrderListItem = ({order, onTagClick}) => {
  return (
    <li className="list-group-item">
      <div className="order-list-item">
        <div className="order-list-item__heading">
          <div className="order-list-item__title-wrap">
            <Link className="order-list-item__title" to={`/orders/${order.id}`}>{order.title}</Link>
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
          <TagsList tags={order.tags} onTagClick={onTagClick}/>
        </div>
        <aside className="order-list-item__price">{order.price / 100} руб.</aside>
      </div>
    </li>
  );
};

export default OrderListItem;
