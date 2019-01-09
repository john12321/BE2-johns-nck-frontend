import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const DeleteArticle = ({ article, user }) => {
  if (article.author === user.username) {
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

export default DeleteArticle;