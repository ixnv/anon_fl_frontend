import React from 'react';
import TagsList from './TagsList';
import AttachmentsList from './AttachmentsList';


const Order = ({order}) => {
  return (
    <div className="panel panel-default">
      <div className="panel-body">
        <header className="order-list-item-header">
          <div className="order-list-item">
            <div className="order-list-item__heading">
              <div className="order-list-item__title-wrap">
                <span className="order-list-item__title">{order.title}</span>
              </div>
              <div className="order-list-item__details">
                <span className="order-list-item__details-date">{order.created_at}</span>
              </div>
              <TagsList tags={order.tags}/>
            </div>
            <aside className="order-list-item__price">
              {order.price}
            </aside>
          </div>
        </header>
        <hr/>
        <p className="order-list-item__description">
          {order.description}
        </p>
        <div className="order-attachments-list__wrap">
          <header>Файлы</header>
          <AttachmentsList attachments={order.attachments}/>
        </div>
      </div>
    </div>
  );
};

export default Order;
