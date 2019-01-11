import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import * as api from '../api';

class DeleteComment extends Component {
  state = {
    clicked: false,
    deletedComment: ''
  }

  handleClick = () => {
    // check props to pass fetchComments func down
    const { article_id, comment_id } = this.props
    this.setState({ deletedComment: { article_id, comment_id } })
    api.deleteItem(article_id, comment_id).then(() => {
      alert('This comment has been deleted');
      //fetchComments again
    })

  }

  render() {
    const { comment, user } = this.props;
    if (comment.author === user.username) {
      return (
        <Button type="submit" variant="contained" color="secondary" >
          Delete
          <DeleteIcon />
        </Button>
      );
    } else {
      return null;
    }
  }
}

export default DeleteComment;
