import React from "react";
import {connect} from "react-redux";
import * as resources from '../api/resources';
import {categoriesListFetch, categoriesListUnload, categoriesListToggle} from '../actions/CategoriesActions';
import CategoriesList from '../components/CategoriesList/CategoriesList';


const mapStateToProps = state => {
  return {
    categories: state.categories.categories
  }
};

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch(categoriesListFetch(payload)),
  onUnload: () => dispatch(categoriesListUnload()),
  // onCategoryClick: () => dispatch(categoriesListToggle())
});


class CategoriesListContainer extends React.Component {
  componentWillMount() {
    this.props.onLoad(resources.OrderCategories.fetch());
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <CategoriesList categories={this.props.categories}/>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesListContainer);
export { CategoriesListContainer as CategoriesListContainer};
