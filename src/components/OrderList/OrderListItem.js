import React from 'react';
import TagsList from '../TagsList';


const OrderListItem = props => {
  return (
    <li className="list-group-item">
      <div className="order-list-item">
        <div className="order-list-item__heading">
          <div className="order-list-item__title-wrap">
            <a className="order-list-item__title" href="/orders/1">{props.order.title}</a>
          </div>
          <div className="order-list-item__details">
            <span className="order-list-item__details-date">{props.order.updated_at}</span>
          </div>
          {/*<TagsList tags={props.order.tags}/>*/}
        </div>
        <aside className="order-list-item__price">{props.order.price}</aside>
      </div>
    </li>
  );
};

export default OrderListItem;
