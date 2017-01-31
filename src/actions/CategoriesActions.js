import {CATEGORIES_FETCH, CATEGORIES_UNLOAD, CATEGORY_SELECT_TOGGLE, CATEGORY_COLLAPSE_TOGGLE} from "../constants/ActionTypes";

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
