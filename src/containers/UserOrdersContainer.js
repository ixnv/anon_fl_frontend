import React from "react";
import {connect} from "react-redux";
import * as resources from '../api/resources';
import {orderContractorListFetch, orderCustomerListFetch} from '../actions/OrderActions';
import {Tabs, Tab, Button} from 'react-bootstrap';
import ContractorOrdersListContainer from './ContractorOrdersListContainer';
import CustomerOrdersListContainer from './CustomerOrdersListContainer';
import {Link} from 'react-router';

const mapStateToProps = state => ({
  orders: state.orders.orders
});

const mapDispatchToProps = dispatch => ({
  loadContractorOrders: () => dispatch(orderContractorListFetch(resources.OrderList.contractor())),
  loadCustomerOrders: () => dispatch(orderCustomerListFetch(resources.OrderList.customer()))
});


class UserOrdersContainer extends React.Component {
  componentWillMount() {
    // by default, load data for 1st tab
    this.props.loadContractorOrders();
  }

  render() {
    const handleSelect = key => {
      switch (key) {
        case 1:
          this.props.loadContractorOrders();
          break;
        case 2:
          this.props.loadCustomerOrders();
          break;
      }
    };

    return (
      <div className="container">
        <h3>Мои заказы</h3>
        <Link to="/orders/create">
          <Button bsStyle="primary">Создать заказ</Button>
        </Link>
        <hr/>
        <Tabs defaultActiveKey={1} onSelect={handleSelect} id="my-orders-tabs">
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
