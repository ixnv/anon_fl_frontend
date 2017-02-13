import {TAG_CREATE, TAG_SELECT} from "../constants/ActionTypes";
import {Tags} from '../api/resources';

export const createTag = (tagText) => ({
  type: TAG_CREATE,
  payload: Tags.create(tagText)
});

export const selectTag = (tag_id) => ({
  type: TAG_SELECT,
  tag_id
});
