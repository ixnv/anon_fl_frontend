import React from "react";
import {connect} from "react-redux";
import {browserHistory, Link} from 'react-router'
import * as resources from '../api/resources';
import {orderListFetch, orderListUnload, ordersFilterProcessed, ordersFilterUpdate, ordersFilterReset} from '../actions/OrderActions';
import {preselectCategories, resetSelectedCategories} from "../actions/CategoriesActions";
import {selectTag} from "../actions/TagsActions";
import OrderList from '../components/OrderList/OrderList';
import {ArrayUtil} from '../util';


const mapStateToProps = (state, ownProps) => ({
  ...state.orders,
  ...state.categories,
  ...state.tags,
  location: ownProps.location
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) => dispatch(orderListFetch(payload)),
  onUnload: () => {
    dispatch(orderListUnload());
    dispatch(ordersFilterReset());
  },
  preselectCategories: categories_ids => dispatch(preselectCategories(categories_ids)),
  resetSelectedCategories: () => dispatch(resetSelectedCategories()),
  updateFilter: (type, param) => dispatch(ordersFilterUpdate(type, param)),
  ordersFilterProcessed: () => dispatch(ordersFilterProcessed()),
  ordersFilterReset: () => dispatch(ordersFilterReset()),
  onTagClick: (tag_id) => {
    dispatch(ordersFilterUpdate('tag', tag_id));
    dispatch(selectTag(tag_id));
  }
});


class OrderListContainer extends React.Component {
  constructor(...args) {
    super(...args);

    this.processFilter = this.processFilter.bind(this);
  }

  componentWillMount() {
    const {tag_id, category} = this.props.location.query;

    if (!tag_id && !category) {
      this.props.onLoad(resources.OrderList.fetch());
      return;
    }

    const categories = category ? category.split(',').map(c => +c): [];

    if (!!category) {
      this.props.updateFilter('category', categories);
      this.props.preselectCategories(categories);
    }

    if (!!tag_id) {
      this.props.onTagClick(tag_id);
    }

    this.processFilter(this.props.filter, true);
  }

  processFilter(filter, initial = false) {
    if (!filter.pending) {
      return;
    }

    const url_params = [];
    if (filter.tag) {
      url_params.push(`tag_id=${filter.tag}`);
    }

    if (filter.categories.length) {
      url_params.push(`category=${filter.categories.join(',')}`);
    }

    const query = url_params.join('&');

    // do not update location
    if (!initial) {
      browserHistory.push('/?' + query);
    }

    this.props.onLoad(resources.OrderList.fetch_by_filter(query));

    this.props.ordersFilterProcessed();
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.location.search.length && !nextProps.location.search.length) {
      this.props.ordersFilterReset();
      this.props.onLoad(resources.OrderList.fetch());
      this.props.resetSelectedCategories();
    }

    if (!ArrayUtil.arraysAreEqual(this.props.selected_categories, nextProps.selected_categories)) {
      this.props.updateFilter('category', nextProps.selected_categories);
      return;
    }

    this.processFilter(nextProps.filter);
  }

  render() {
    const renderHeader = () => {
      if (this.props.filter.empty) {
        return (
          <div className="order-list__header panel">
            <h4>Все заказы ({this.props.ordersOnServerCount})</h4>
          </div>
        );
      }

      return (
        <div className="order-list__header panel">
          <h4>
            Поиск по заказам. Найдено результатов: {this.props.ordersOnServerCount}
          </h4>
          <div>
            <Link to="/">Сбросить фильтрацию</Link>
          </div>
        </div>
      );
    };

    return (
      <div>
        {renderHeader()}
        <OrderList onTagClick={this.props.onTagClick} orders={this.props.orders}/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderListContainer);
export { OrderListContainer as OrderListContainer};
