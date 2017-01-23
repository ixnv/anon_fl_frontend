import React from "react";
import {connect} from "react-redux";
import {orderContractorListFetch, orderContractorListUnload} from '../actions/OrderActions';
import OrderList from '../components/OrderList/OrderList';
import {Link}from 'react-router';


const mapStateToProps = state => ({
  orders: state.orders.contractor,
  inProgress: state.orders.inProgress
});

const mapDispatchToProps = dispatch => ({
  onUnload: () => dispatch(orderContractorListUnload())
});


class ContractorOrdersListContainer extends React.Component {
  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    if (!this.props.inProgress && !this.props.orders.length) {
      return (
        <div>
          <h3>Выполняемых заказов пока нет</h3>
          <Link to="/">Найти заказы</Link>
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
