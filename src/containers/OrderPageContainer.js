import React from "react";
import {connect} from "react-redux";
import * as resources from '../api/resources';
import {orderGet, orderUnload} from '../actions/OrderActions';
import Order from '../components/Order';


const mapStateToProps = state => ({
  order: state.orders.order
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch(orderGet(payload)),
  onUnload: () => dispatch(orderUnload())
});


class OrderPageContainer extends React.Component {
  componentWillMount() {
    const id = this.props.params.id;
    this.props.onLoad(resources.Order.fetch(id));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <section className="container">
        <div className="row">
          <div className="col-md-9 panel-body">
            <Order order={this.props.order}/>
          </div>
        </div>
      </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPageContainer);
export { OrderPageContainer as OrderPageContainer};
