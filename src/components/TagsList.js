import React from 'react';
import shortid from 'shortid';
import {Button} from 'react-bootstrap';


const TagsList = ({tags, onTagClick}) => {
  if (!tags) {
    return null;
  }

  return (
    <ul className="tags-list">
      {
        tags.map(tag => (
          <li key={shortid.generate()} className="tags-list__item">
            <Button onClick={() => onTagClick(tag.id)} bsStyle="link">{tag.tag}</Button>
          </li>
        ))
      }
    </ul>
  );
};

export default TagsList;
