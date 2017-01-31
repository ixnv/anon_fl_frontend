import {TAG_CREATE, TAGS_SUGGESTIONS_CLEAR, TAGS_SUGGESTIONS_FETCH, TAG_SUGGESTION_SELECTED} from "../constants/ActionTypes";

const initialState = {
  createdTag: {},
  suggestedTag: {},
  suggestions: [],
  tagCreationInProgress: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TAG_CREATE: {
      return {
        ...state,
        createdTag: action.error ? {}: action.payload,
        errors: action.error,
        tagCreationInProgress: false
      }
    }
    case 'ASYNC_START':
      if (action.subtype === TAG_CREATE) {
        return {
          ...state,
          tagCreationInProgress: true
        };
      }
      return {
        ...state
      };
    case 'ASYNC_END':
      if (action.subtype === TAG_CREATE) {
        return {
          ...state,
          tagCreationInProgress: false
        };
      }
      return {
        ...state
      };
    case TAGS_SUGGESTIONS_CLEAR: {
      return {
        ...state,
        suggestions: []
      };
    }
    case TAGS_SUGGESTIONS_FETCH: {
      return {
        ...state,
        suggestions: action.error ? []: action.payload.results
      };
    }
    case TAG_SUGGESTION_SELECTED: {
      return {
        ...state,
        suggestedTag: action.tag
      };
    }
    default:
      return {
        ...state
      };
  }
}
