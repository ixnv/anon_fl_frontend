import {CATEGORY_SELECT_TOGGLE, CATEGORY_COLLAPSE_TOGGLE, CATEGORIES_FETCH, CATEGORIES_PRESELECT, CATEGORIES_SELECTED_RESET} from './../constants/ActionTypes';

const initialState = {
  categories: [],
  preselected_categories: [],
  selected_categories: []
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
        category.collapsed = true;

        let countSelected = 0;

        category.subcategories.map(subcategory => {
          if (state.preselected_categories.indexOf(subcategory.id) !== -1) {
            subcategory.selected = true;
            category.collapsed = false;
            countSelected++;
          } else {
            subcategory.selected = false;
          }
        });

        category.selected = countSelected === category.subcategories.length;
      });

      return {
        ...state,
        categories
      };
    }
    case CATEGORIES_PRESELECT:
      return {
        ...state,
        preselected_categories: action.categories_ids
      };
    case CATEGORY_SELECT_TOGGLE: {
      // FIXME: it's hard to read, needs to be refactored. split in two actions, maybe?
      const categories = state.categories.slice();
      const selected_categories = state.selected_categories.slice();

      // select all
      if (action.isParent) {
        const index = findIndexByKey(categories, 'id', action.id);
        categories[index].selected ^= true;
        categories[index].subcategories.map(subcategory => {
          subcategory.selected ^= true;
          if (subcategory.selected) {
            selected_categories.push(subcategory.id);
          } else {
            selected_categories.splice(selected_categories.indexOf(subcategory.id), 1);
          }
        });
      } else {
        const parentIndex = findIndexByKey(categories, 'id',  action.parentId);
        const childIndex = findIndexByKey(categories[parentIndex].subcategories, 'id', action.id);

        categories[parentIndex].subcategories[childIndex].selected ^= true;

        if (categories[parentIndex].subcategories[childIndex].selected) {
          selected_categories.push(categories[parentIndex].subcategories[childIndex].id);
        } else {
          selected_categories.splice(selected_categories.indexOf(categories[parentIndex].subcategories[childIndex].id), 1);
        }

        // toggle parent
        const amountSelected = categories[parentIndex].subcategories.filter(category => category.selected).length;
        categories[parentIndex].selected = amountSelected === categories[parentIndex].subcategories.length;
      }

      return {
        ...state,
        categories,
        selected_categories
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
    case CATEGORIES_SELECTED_RESET: {
      const categories = state.categories.slice();
      categories.map(category => {
        category.selected = false;
        category.collapsed = true;
        category.subcategories.map(subcategory => {
          subcategory.selected = false;
        });
      });
      return {
        ...state,
        selected_categories: []
      }
    }
  }

  return {
    ...state
  };
};
