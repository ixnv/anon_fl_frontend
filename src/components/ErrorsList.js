import React from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import shortid from 'shortid';


const ErrorsList = props => {
  if (!props.errors) {
    return null;
  }

  const errors = Object.keys(props.errors).map(key => props.errors[key]).reduce((a, b) => a.concat(b));

  return (
    <ListGroup>
      {
        errors.map(error => {
          return (
            <ListGroupItem bsStyle="danger" key={shortid.generate()}>
              {error}
            </ListGroupItem>
          );
        })
      }
    </ListGroup>
  );
};

export default ErrorsList;
