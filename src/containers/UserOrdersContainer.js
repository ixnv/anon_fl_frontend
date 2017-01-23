import React from "react";
import {connect} from "react-redux";
import * as resources from '../api/resources';
import {orderContractorListFetch, orderCustomerListFetch} from '../actions/OrderActions';
import {Tabs, Tab} from 'react-bootstrap';
import ContractorOrdersListContainer from './ContractorOrdersListContainer';
import CustomerOrdersListContainer from './CustomerOrdersListContainer';
import {} from '../actions/OrderActions';

const mapStateToProps = state => ({
  orders: state.orders.orders
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch(orderContractorListFetch(payload))
});


class UserOrdersContainer extends React.Component {
  componentWillMount() {
    // by default, load data for 1st tab
    this.props.onLoad(resources.OrderList.contractor());
  }

  handleSelect(ev) {
    if (ev === 1) {
      orderContractorListFetch(resources.OrderList.contractor());
    } else if (ev === 2) {
      console.log(ev);
      orderCustomerListFetch(resources.OrderList.customer());
    }
  }

  render() {
    return (
      <div className="container">
        <h3>Мои заказы</h3>
        <Tabs defaultActiveKey={1} onSelect={this.handleSelect} id="my-orders-tabs">
          <Tab eventKey={1} title="Выполняемые">
            <ContractorOrdersListContainer/>
          </Tab>
          <Tab eventKey={2} title="Созданные">
            <CustomerOrdersListContainer/>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserOrdersContainer);
export { UserOrdersContainer as UserOrdersContainer};
