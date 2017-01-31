import {CATEGORY_SELECT_TOGGLE, CATEGORY_COLLAPSE_TOGGLE, CATEGORIES_FETCH} from './../constants/ActionTypes';

const initialState = {
  categories: []
};

// FIXME: move to helpers?
const findIndexByKey = (obj, key, needle) => {
  return obj.map(item => item[key] === needle).indexOf(true);
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CATEGORIES_FETCH: {
      const categories = action.payload.results;
      categories.map(category => {
        category.selected = false;
        category.collapsed = true;
        category.subcategories.map(subcategory => subcategory.selected = false);
      });

      return {
        ...state,
        categories
      };
    }
    case CATEGORY_SELECT_TOGGLE: {
      // FIXME: it's hard to read, needs to be refactored
      const categories = state.categories.slice();

      // select all
      if (action.isParent) {
        const index = findIndexByKey(categories, 'id', action.id);
        categories[index].selected = !categories[index].selected;
        categories[index].subcategories.map(subcategory => {
          subcategory.selected = !subcategory.selected;
        });
      } else {
        const parentIndex = findIndexByKey(categories, 'id',  action.parentId);
        const childIndex = findIndexByKey(categories[parentIndex].subcategories, 'id', action.id);

        categories[parentIndex].subcategories[childIndex].selected = !categories[parentIndex].subcategories[childIndex].selected;

        // toggle parent
        const amountSelected = categories[parentIndex].subcategories.filter(category => category.selected).length;
        categories[parentIndex].selected = amountSelected === categories[parentIndex].subcategories.length;
      }

      return {
        ...state,
        categories
      };
    }
    case CATEGORY_COLLAPSE_TOGGLE: {
      const categories = state.categories.slice();
      const index = findIndexByKey(categories, 'id', action.id);
      categories[index].collapsed = !categories[index].collapsed;

      return {
        ...state,
        categories
      }
    }
  }

  return {
    ...state
  };
};
