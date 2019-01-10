import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import * as api from '../api';

class DeleteArticle extends Component {
  state = {
    clicked: false,
    deletedArticle: ''
  }

  handleClick = () => {
    const { article } = this.props
    this.setState({ deletedArticle: article.topic })
    api.deleteItem(article.article_id).then(() => {
      console.log('deleted');
    })

  }

  render() {
    if (this.props.author === this.props.user.username) {
      return (
        <Button onClick={this.handleClick} variant="contained" color="secondary" >
          Delete
          <DeleteIcon />
        </Button>
      );
    } else {
      return null;
    }
  }
}

export default DeleteArticle;
