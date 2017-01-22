import React from "react";
import {connect} from "react-redux";
import * as resources from '../api/resources';
import {orderListFetch, orderListUnload} from '../actions/OrderActions';
import OrderList from '../components/OrderList/OrderList';


const mapStateToProps = state => ({
  orders: state.orders.orders
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch(orderListFetch(payload)),
  onUnload: () => dispatch(orderListUnload())
});


class UserOrdersContainer extends React.Component {
  componentWillMount() {
    this.props.onLoad(resources.OrderList.fetch_own());
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <OrderList orders={this.props.orders}/>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserOrdersContainer);
export { UserOrdersContainer as UserOrdersContainer};
