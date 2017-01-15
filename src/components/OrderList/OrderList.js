import React from 'react';
import OrderListItem from './OrderListItem';
import shortid from 'shortid';

const OrderList = ({orders}) => {
  return (
    <ul className="order-list list-group">
      {orders && orders.map(order => {
        return (
          <OrderListItem key={shortid.generate()} order={order}/>
        );
      })}
    </ul>
  );
};

export default OrderList;
