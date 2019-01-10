import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const DeleteComment = ({ comment, user }) => {
  if (comment.author === user.username) {
    return (
      <Button variant="contained" color="secondary" >
        Delete
        <DeleteIcon />
      </Button>
    );
  } else {
    return null;
  }

};

export default DeleteComment;