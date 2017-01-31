import {TAG_CREATE} from "../constants/ActionTypes";
import {Tags} from '../api/resources';

export const createTag = (tagText) => ({
  type: TAG_CREATE,
  payload: Tags.create(tagText)
});
