import React from "react";
import {connect} from "react-redux";
import {toastr} from 'react-redux-toastr'
import {browserHistory} from 'react-router'

import CreateOrderForm from '../components/CreateOrderForm';
import * as resources from "../api/resources";

import {TAGS_SUGGESTIONS_CLEAR, TAGS_SUGGESTIONS_FETCH, TAG_SUGGESTION_SELECTED, } from "../constants/ActionTypes";
import {orderCreate, addOrderTag, removeOrderTag} from "../actions/OrderActions";
import {updateFormField, clearForm} from "../actions/FormActions";
import {createTag} from "../actions/TagsActions";
import {categoriesListFetch, categoriesListUnload} from "../actions/CategoriesActions";


const mapStateToProps = state => ({
  categories: state.categories.categories,
  ...state.forms.forms.create_order,
  ...state.tags
});


const formName = 'create_order';

// FIXME: split this bloated container
const mapDispatchToProps = (dispatch) => ({
  onLoad: payload => dispatch(categoriesListFetch(payload)),
  onUnload: () => {
    dispatch(categoriesListUnload());
    dispatch(clearForm(formName))
  },
  updateField: (key, value) => dispatch(updateFormField(formName, key, value)),

  // order
  createOrder: (title, description, price, category_id, tags) => {
    const action = orderCreate(title, description, price, category_id, tags);
    action.onSuccess = (state) => {
      toastr.success('Заказ', 'Заказ успешно создан');
      browserHistory.push(`/orders/${state.orders.createdOrder.id}`)
    };
    dispatch(action);
  },
  cancel: () => {
    browserHistory.push('/orders/my');
  },

  // suggestions
  fetchTagsSuggestions: ({value}) => {
    const min_length = 3;
    if (value.length >= min_length) {
      dispatch({type: TAGS_SUGGESTIONS_FETCH, payload: resources.Tags.search(value)});
    }
  },
  clearTagsSuggestions: () => {
    dispatch({type: TAGS_SUGGESTIONS_CLEAR});
  },
  getSuggestionValue: (tag) => {
    dispatch({type: TAG_SUGGESTION_SELECTED, tag});
    return tag.tag;
  },

  addTag: (isNew, tagText, suggestedTag) => {
    if (isNew) {
      const createTagAction = createTag(tagText);
      createTagAction.onSuccess = (state) => {
        dispatch(addOrderTag(state.tags.createdTag));
      };

      dispatch(createTagAction);
    } else {
      dispatch(addOrderTag(suggestedTag));
    }
  },
  removeTag: (id) => {
    dispatch(removeOrderTag(id))
  }
});


class CreateOrderContainer extends React.Component {
  componentWillMount() {
    this.props.onLoad(resources.OrderCategories.fetch());
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="container">
        <h3>Создать заказ</h3>
        <CreateOrderForm {...this.props}/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrderContainer);
export { CreateOrderContainer as CreateOrderContainer };
