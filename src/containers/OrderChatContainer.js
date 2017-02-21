import React from "react";
import {connect} from "react-redux";
import {orderChatFetch, orderChatSendMessage, orderChatUnload, orderChatAllowAccess, orderChatReadMessages} from "../actions/OrderChatActions";
import {OrderChat} from '../api/resources';

import {Button} from 'react-bootstrap';
import shortid from "shortid";
import {clearForm, updateFormField} from "../actions/FormActions";
import {ORDER_STATUS_IN_PROCESS, ORDER_STATUS_COMPLETED_WITH_SUCCESS, ORDER_STATUS_COMPLETED_WITH_FAIL} from "../constants/OrderStatuses";
import {DateUtil, StringUtil} from "../util";
import {webSocketEmitEvent} from "../actions/WebsocketActions";
import * as ReactDOM from "react-dom";


const formName = 'send_message';

const mapStateToProps = state => ({
  ...state.chats,
  ...state.forms.forms.send_message,
  order: state.orders.order,
  currentUser: state.users.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, user_id) => {
    const action = orderChatFetch(payload, user_id);
    action.onSuccess = (state) => {
      dispatch(webSocketEmitEvent('joinChat', {chat_id: state.chats.currentChatId}));
    };
    dispatch(action);
  },
  onUnload: () => {
    dispatch(orderChatUnload());
    dispatch(clearForm(formName));
  },
  sendMessage: (order_id, message) => {
    if (!message.length) {
      return;
    }

    dispatch(orderChatSendMessage(order_id, StringUtil.br2nl(message)));
    dispatch(clearForm(formName));
  },
  onMessageChange: e => dispatch(updateFormField(formName, 'message', (e.target.innerHTML))),
  onMessageFieldFocus: (orderId, unreadAmount) => {
    if (!unreadAmount) {
      return;
    }

    dispatch(orderChatReadMessages(orderId));
    OrderChat.readMessages(orderId);
  },
  allowAccess: () => dispatch(orderChatAllowAccess()),
  websocketLeaveChat: (chat_id) => dispatch(webSocketEmitEvent('leaveChat', {chat_id}))
});


class OrderChatContainer extends React.Component {
  constructor(...args) {
    super(...args);

    this.needToAllowAccess = (props) => {
      if (props.hasAccessToChat || !props.currentUser.loggedIn) {
        return false;
     }

     const statuses = [
       ORDER_STATUS_IN_PROCESS, ORDER_STATUS_COMPLETED_WITH_SUCCESS, ORDER_STATUS_COMPLETED_WITH_FAIL
     ];

     if (!~statuses.indexOf(props.order.status)) {
       return false;
     }

     return ~[props.order.contractor.id, props.order.customer_id].indexOf(props.currentUser.id);
   };
  }

  componentDidMount() {
    if (!this.needToAllowAccess(this.props)) {
      return;
    }

    this.props.allowAccess();
    this.props.onLoad(OrderChat.fetch(this.props.order.id), this.props.currentUser.id);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.needToAllowAccess(nextProps)) {
      this.props.allowAccess();
    }

    // for some reason div with contentEditable attr does not clear itself when corresponding value property is empty
    if (this.props.message.length && !nextProps.message.length) {
      const messageFieldNode = ReactDOM.findDOMNode(this.messageField);
      messageFieldNode.innerHTML = '';

      const messagesWrapNode = ReactDOM.findDOMNode(this.messagesWrap);
      messagesWrapNode.scrollTop = messagesWrapNode.scrollHeight;
    }

    const messagesUpdated = this.props.messages.length !== nextProps.messages.length;
    if (((this.props.inProgress && !nextProps.inProgress) || messagesUpdated) && this.messagesWrap) {
      const node = ReactDOM.findDOMNode(this.messagesWrap);
      // wait for component draw completion
      setTimeout(()=> node.scrollTop = node.scrollHeight, 10);
    }
  }

  componentWillUnmount() {
    this.props.onUnload();

    if (this.props.hasAccessToChat) {
      this.props.websocketLeaveChat(this.props.currentChatId);
    }
  }

  render() {
    if (!this.props.hasAccessToChat) {
      return null;
    }

    const messagesOrEmpty = () => {
      if (!this.props.messages.length) {
        return (
          <div className="order-chat__empty-alert">В этом чате вы можете обсуждать рабочие вопросы</div>
        );
      }

      let prevMessage = null;

      return (
        <ul className="list-unstyled order-chat__messages--list">
          {this.props.messages && this.props.messages.map(message => {
            const isOwn = message.sender_id === this.props.currentUser.id;
            const isCustomer = this.props.order.customer_id === this.props.currentUser;

            const interlocutor = isCustomer ? this.props.order.contractor.username: this.props.order.customer.username;
            let interlocutorDisplayText = '';

            if (!prevMessage || prevMessage.sender_id !== message.sender_id) {
              interlocutorDisplayText = isOwn ? 'Вы': interlocutor;
            }

            prevMessage = message;

            const listItemClassName = 'order-chat__message' + (!message.is_read && !isOwn ? ' order-chat__message--new': '');

            return (
              <li key={shortid.generate()} className={listItemClassName}>
                <div className="row">
                  <div className="col-sm-1">{interlocutorDisplayText}</div>
                  <div className="col-sm-9 order-chat__message-text">{message.message}</div>
                  <div className="col-sm-2 order-chat__message-time">{DateUtil.formatDate(message.created_at)}</div>
                </div>
              </li>
            );
          })}
        </ul>
      );
    };

    return (
      <div>
        <header>
          <center>
          <h3>Чат</h3>
          </center>
        </header>
        <section className="order-chat__messages" ref={section => this.messagesWrap = section}>
          {messagesOrEmpty()}
        </section>
        <section>
          <form>
            <div className="order-chat__message-field" contentEditable="true"
                value={this.props.message} ref={field => this.messageField = field}
                onInput={(e) => this.props.onMessageChange(e)}
                onFocus={() => this.props.onMessageFieldFocus(this.props.order.id, this.props.unreadMessagesCount)}
            />
            <Button bsStyle="primary"
                onClick={() => this.props.sendMessage(this.props.order.id, this.props.message)}
            >
              Отправить
            </Button>
          </form>
        </section>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderChatContainer);
export { OrderChatContainer as OrderChatContainer};
