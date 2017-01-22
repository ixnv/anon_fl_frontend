import React from 'react';
import shortid from 'shortid';


const TagsList = ({tags}) => {
  if (!tags) {
    return null;
  }

  return (
    <ul className="tags-list">
      {
        tags.map(tag => (
          <li key={shortid.generate()} className="tags-list__item">
            <a href={tag.id}>{tag.tag}</a>
          </li>
        ))
      }
    </ul>
  );
};

export default TagsList;
