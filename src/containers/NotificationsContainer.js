import React from "react";
import {connect} from "react-redux";
import {Badge, NavDropdown, Glyphicon, ListGroup, ListGroupItem} from 'react-bootstrap';
import {Link} from 'react-router';
import shortid from "shortid";
import {
  ORDER_APPLICATION_APPROVED,
  ORDER_APPLICATION_DECLINED, ORDER_APPLICATION_REQUEST_RECEIVED,
  ORDER_CHAT_NEW_MESSAGE
} from "../constants/WebSocketsEvents";
import {readNotifications} from "../actions/NotificationsActions";
import {Notifications} from "../api/resources";


const mapStateToProps = state => ({
  ...state.notifications,
  currentPage: state.common.currentPage
});

const mapDispatchToProps = dispatch => ({
  readNotifications: (unreadAmount) => {
    if (!unreadAmount) {
      return;
    }

    dispatch(readNotifications());

    // don't care about response, call it in "non-blocking" way
    Notifications.mark_as_read();
  }
});

class NotificationsContainer extends React.Component {
  constructor(...args) {
    super(...args);

    this.renderUnreadAmount = amount => {
      if (!amount) return null;

      return (
        <Badge bsClass="badge notifications-count-badge">{amount}</Badge>
      );
    };

    this.renderNotification = notification => {
      const getOrderData = (notification) => {
        return {
          id: notification.is_instant ? notification.order_id: notification.data.order_id,
          title: notification.is_instant ? notification.order_title: notification.data.order_title
        };
      };

      notification.is_instant = !notification.data;

      switch (notification.type) {
        case ORDER_CHAT_NEW_MESSAGE: {
          const order = getOrderData(notification);
          return (
            <ListGroupItem key={shortid.generate()}>
              <Glyphicon glyph="envelope"/>&nbsp;
              В чате заказа <Link to={`/orders/${order.id}`}>{order.title}</Link> новое сообщение
            </ListGroupItem>
          );
        }
        case ORDER_APPLICATION_REQUEST_RECEIVED: {
          const order = getOrderData(notification);
          return (
            <ListGroupItem key={shortid.generate()}>
              <Glyphicon glyph="plus-sign"/>&nbsp;
              Новая завка в заказе <Link to={`/orders/${order.id}`}>{order.title}</Link>
            </ListGroupItem>
          );
        }
        case ORDER_APPLICATION_DECLINED: {
          const order = getOrderData(notification);
          return (
            <ListGroupItem key={shortid.generate()}>
              <Glyphicon glyph="ban-circle"/>&nbsp;
              Отклонена заявка на заказ <Link to={`/orders/${order.id}`}>{order.title}</Link>
            </ListGroupItem>
          );
        }
        case ORDER_APPLICATION_APPROVED: {
          const order = getOrderData(notification);
          return (
            <ListGroupItem key={shortid.generate()}>
              <Glyphicon glyph="ok-circle"/>&nbsp;
              Принята заявка на заказ <Link to={`/orders/${order.id}`}>{order.title}</Link>
            </ListGroupItem>
          );
        }
      }
    };
  }

  render() {
    return (
      <NavDropdown id="notifications-dropdown" onToggle={(isOpen) => {
        this.props.read
      }} noCaret onClick={(ev) => this.props.readNotifications(this.props.unreadAmount)} title={
        <span>
          <Glyphicon glyph="bell"/>
          {this.renderUnreadAmount(this.props.unreadAmount)}
        </span>
      }>
        <ListGroup componentClass="ul" className="notifications-list">
          {!this.props.notifications.length && (
            <ListGroupItem bsStyle="info">Нет непрочитанных оповещений</ListGroupItem>
          )}

          {this.props.notifications && this.props.notifications.map(notification => {
            return this.renderNotification(notification);
          })}
        </ListGroup>
      </NavDropdown>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsContainer);
export { NotificationsContainer as NotificationsContainer};
