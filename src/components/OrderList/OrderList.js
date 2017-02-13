import React from 'react';
import OrderListItem from './OrderListItem';
import shortid from 'shortid';

const OrderList = ({orders, onTagClick}) => {
  return (
    <ul className="order-list list-group">
      {orders && orders.map(order => {
        return (
          <OrderListItem key={shortid.generate()} order={order} onTagClick={onTagClick}/>
        );
      })}
    </ul>
  );
};

export default OrderList;
