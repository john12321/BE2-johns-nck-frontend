import React, { Component } from 'react';
import * as api from '../api';
import { Button } from '@material-ui/core';
class CommentPost extends Component {
  state = {
    comment: ''
  }

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const {
      article_id,
      user
    } = this.props;
    api.postComment(article_id, this.state.comment, user.user_id).catch(err => {
      //need error-catcher for failed post
    });
    this.props.addComment(this.state.comment, user.username);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Post your comment,  {this.props.user.username}</label>
        <input
          type="text"
          onChange={this.handleChange}
          id="comment"
          value={this.state.comment}
        />
        <button variant="outlined" >
          submit
        </button>
      </form>
    );
  }
}

export default CommentPost;