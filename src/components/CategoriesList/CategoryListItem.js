import React from 'react';
import shortid from 'shortid';

const CategoryListItem = ({category, folded}) => {
  const innerListClasses = !folded ? 'list-unstyled categories-list__inner-list': 'list-unstyled categories-list__inner-list';

  const id = shortid.generate();
  return (
    <li>
      <div>
        <span>
          <input className="categories-list__toggle-all" id={"categories-list__toggle-all-" + id} type="checkbox"/>
          <label htmlFor={"categories-list__toggle-all-" + id}/>
        </span>
        <label>{category.title}</label>
      </div>
      <ul className="list-unstyled categories-list--nested">
        {category.subcategories && category.subcategories.map(subcategory => {
          const id = shortid.generate();

          return (
            <li key={id}>
              <input className="categories-list__toggle" type="checkbox" id={"categories-list__toggle-" + id}/>
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
