import React from "react";
import {connect} from "react-redux";

import {OrderCategories} from '../api/resources';
import {categoriesListFetch, categoriesListUnload, categorySelectToggle, categoryCollapseToggle} from '../actions/CategoriesActions';
import CategoriesList from '../components/CategoriesList/CategoriesList';


const mapStateToProps = state => {
  return {
    ...state.categories
  }
};

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch(categoriesListFetch(payload)),
  onUnload: () => dispatch(categoriesListUnload()),
  onCategorySelectToggle: (isParent, parentId, id) => dispatch(categorySelectToggle(isParent, parentId, id)),
  onCategoryCollapseToggle: (id) => dispatch(categoryCollapseToggle(id))
});


class CategoriesListContainer extends React.Component {
  componentWillMount() {
    this.props.onLoad(OrderCategories.fetch());
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <CategoriesList {...this.props}/>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesListContainer);
export { CategoriesListContainer as CategoriesListContainer};
