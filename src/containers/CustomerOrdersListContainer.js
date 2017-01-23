import React from "react";
import {connect} from "react-redux";
import {orderCustomerListFetch, orderCustomerListUnload} from '../actions/OrderActions';
import OrderList from '../components/OrderList/OrderList';
import {Link} from 'react-router';


const mapStateToProps = state => ({
  orders: state.orders.customer
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch(orderCustomerListFetch(payload)),
  onUnload: () => dispatch(orderCustomerListUnload())
});


class ContractorOrdersListContainer extends React.Component {
  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    if (!this.props.inProgress && !this.props.orders.length) {
      return (
        <div>
          <h3>Вы не создали ни одного заказа</h3>
          <Link to="/">Создать заказ</Link>
        </div>
      );
    }

    return (
      <OrderList orders={this.props.orders}/>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContractorOrdersListContainer);
export { ContractorOrdersListContainer as ContractorOrdersListContainer};
