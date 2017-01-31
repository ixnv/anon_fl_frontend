import React from 'react';
import shortid from 'shortid';
import {Fade} from 'react-bootstrap';

const CategoryListItem = ({category, onCategorySelectToggle, onCategoryCollapseToggle}) => {
  const id = shortid.generate();

  const getNestedListClassName = (parentCategory) => {
    const base = 'list-unstyled categories-list--nested';
    return base + (parentCategory.collapsed ? ' categories-list--collapsed': '')
  };

  const getCollapseToggleClassName = (category) => {
    const base = 'categories-list__collapse-toggle ';
    return base + (category.collapsed ? 'categories-list__collapse-toggle--collapsed': 'categories-list__collapse-toggle--open');
  };

  return (
    <li>
      <div>
        <input
          type="checkbox"
          className="categories-list__toggle-all"
          id={"categories-list__toggle-all-" + id} checked={category.selected}
          onChange={() => onCategorySelectToggle(true, category.parent_id, category.id)}
        />
        <label
          className="categories-list__toggle-label"
           htmlFor={"categories-list__toggle-all-" + id}
        />
        <label className={getCollapseToggleClassName(category)} onClick={() => onCategoryCollapseToggle(category.id)}>{category.title}</label>
      </div>
      <ul className={getNestedListClassName(category)}>
        {category.subcategories && category.subcategories.map(subcategory => {
          const id = shortid.generate();

          return (
            <li key={id} onClick={() => onCategorySelectToggle(false, subcategory.parent_id, subcategory.id)}>
              <input
                type="checkbox"
                className="categories-list__toggle"
                id={"categories-list__toggle-" + id}
                checked={subcategory.selected}
                onChange={() => onCategorySelectToggle(false, subcategory.parent_id, subcategory.id)}
              />
              <label htmlFor={"categories-list__toggle-" + id} className="categories-list__toggle-label">
                {subcategory.title}
              </label>
            </li>
          );
        })}
      </ul>
    </li>
  );
};

export default CategoryListItem;
