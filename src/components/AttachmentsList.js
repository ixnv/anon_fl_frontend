import React from 'react';
import shortid from 'shortid';


const AttachmentsList = ({attachments}) => {
  if (!attachments) {
    return null;
  }

  return (
    <ul className="list-inline order-attachments-list">
      {
        attachments.map(attachment => (
          <li key={shortid.generate()}>
            <a href={attachment.url}>{attachment.filename}</a>
          </li>
        ))
      }
    </ul>
  );
};

export default AttachmentsList;
