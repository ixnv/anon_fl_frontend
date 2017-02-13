import {CATEGORIES_FETCH, CATEGORIES_UNLOAD, CATEGORY_SELECT_TOGGLE, CATEGORY_COLLAPSE_TOGGLE, CATEGORIES_PRESELECT, CATEGORIES_SELECTED_RESET} from "../constants/ActionTypes";

export const categoriesListFetch = (payload) => {
  return {
    type: CATEGORIES_FETCH,
    payload
  };
};

export const categoriesListUnload = () => {
  return {
    type: CATEGORIES_UNLOAD
  }
};

export const categorySelectToggle = (isParent, parentId, id) => {
  return {
    type: CATEGORY_SELECT_TOGGLE,
    isParent,
    parentId,
    id
  }
};

export const categoryCollapseToggle = (id) => {
  return {
    type: CATEGORY_COLLAPSE_TOGGLE,
    id
  }
};

export const preselectCategories = (categories_ids) => ({
  type: CATEGORIES_PRESELECT,
  categories_ids
});

export const resetSelectedCategories = () => ({
  type: CATEGORIES_SELECTED_RESET
});
