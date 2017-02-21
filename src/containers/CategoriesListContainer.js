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
  onLoad: () => dispatch(categoriesListFetch()),
  onUnload: () => dispatch(categoriesListUnload()),
  onCategorySelectToggle: (isParent, parentId, id) => dispatch(categorySelectToggle(isParent, parentId, id)),
  onCategoryCollapseToggle: (id) => dispatch(categoryCollapseToggle(id))
});


class CategoriesListContainer extends React.Component {
  componentWillMount() {
    this.props.onLoad();
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="categories-toggler panel">
        <h4>Категории</h4>
        <CategoriesList {...this.props}/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesListContainer);
export { CategoriesListContainer as CategoriesListContainer};
