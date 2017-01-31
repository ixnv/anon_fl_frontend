import React from 'react';
import shortid from 'shortid';
import CategoryListItem from './CategoryListItem';


const CategoriesList = ({categories, onCategorySelectToggle, onCategoryCollapseToggle}) => {
  return (
    <ul className="list-unstyled">
      {categories && categories.map(category => {
        return (
          <CategoryListItem
            key={shortid.generate()}
            category={category}
            onCategorySelectToggle={onCategorySelectToggle}
            onCategoryCollapseToggle={onCategoryCollapseToggle}
          />
        );
      })}
    </ul>
  );
};

export default CategoriesList;
