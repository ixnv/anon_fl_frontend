import React from "react";
import {connect} from "react-redux";
import {toastr} from 'react-redux-toastr';
import * as resources from '../api/resources';
import {SIGN_IN_MODAL} from '../constants/ModalTypes';
import {showModal} from "../actions/ModalActions";
import {orderGet, orderUnload} from '../actions/OrderActions';
import {applyForOrder, applyForOrderSuccess, cancelApplication, declineApplication, acceptApplication} from "../actions/ApplicationActions";
import Order from '../components/Order';
import ApplyPanel from '../components/ApplyPanel';
import ApplicationsList from '../components/ApplicationsList';
import OrderChatContainer from '../containers/OrderChatContainer';
import {setCurrentPage} from "../actions/CommonActions";


const mapStateToProps = state => ({
  order: state.orders.order,
  currentUser: state.users.currentUser,
  application: state.orders.order.application
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch(orderGet(payload)),
  setCurrentPage: ({section, id}) => dispatch(setCurrentPage({section, id})),
  onUnload: () => dispatch(orderUnload()),

  // applicant actions
  onApply: (order_id, user) => {
    if (!user.loggedIn) {
      dispatch(showModal(SIGN_IN_MODAL));
      return;
    }
    const action = applyForOrder(resources.OrderApplication.create(order_id, user.id));
    action.onSuccess = () => {
      toastr.success('Заявка', 'Заявка успешно подана');
      dispatch(applyForOrderSuccess(order_id));
    };

    action.onError = (state, status) => {
      let message = 'Возникла ошибка';
      switch (status) {
        case 400:
          message = 'У заказа уже есть исполнитель';
          break;
        case 404:
          message = 'Заказ не найден или перенесен в архив';
          break;
      }
      toastr.error('Заявка не принята', message);
    };

    dispatch(action);
  },
  onCancelApplication: (order_id) => {
    if (!confirm('Уверены?')) {
      return;
    }

    const action = cancelApplication(resources.OrderApplication.cancel(order_id));
    action.onSuccess = () => {
      toastr.success('Заявка', 'Заявка отменена');
    };

    dispatch(action);
  },

  // customer actions
  onDeclineApplication: (order_id, application_id) => {
    if (!confirm('Вы уверены?')) {
      return;
    }

    dispatch(declineApplication(resources.OrderApplication.decline(order_id, application_id)));
  },
  onAcceptApplication: (order_id, application_id) => {
    if (!confirm('Вы уверены?')) {
      return;
    }

    const action = acceptApplication(resources.OrderApplication.accept(order_id, application_id));
    action.onSuccess = () => {
      dispatch(orderGet(resources.Order.fetch(order_id)));
    };

    dispatch(action);
  }
});


class OrderPageContainer extends React.Component {
  componentWillMount() {
    const id = this.props.params.id;
    this.props.onLoad(resources.Order.fetch(id));

    this.props.setCurrentPage({section: 'order', id});
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <section className="container">
        <div className="row">
          <div className="col-md-9 panel-body">
            <Order {...this.props}>
              <ApplyPanel {...this.props}/>
              <ApplicationsList {...this.props}/>
              <OrderChatContainer/>
            </Order>
          </div>
        </div>
      </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPageContainer);
export { OrderPageContainer as OrderPageContainer};
