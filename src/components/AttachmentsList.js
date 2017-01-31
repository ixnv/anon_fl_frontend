import React from 'react';
import shortid from 'shortid';


const AttachmentsList = attachments => {
  if (!attachments.length) {
    return null;
  }

  return (
    <div className="order-attachments-list__wrap">
      <header>Файлы</header>
      <ul className="list-inline order-attachments-list">
        {
          attachments.map(attachment => (
            <li key={shortid.generate()}>
              <a href={attachment.url}>{attachment.filename}</a>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default AttachmentsList;
