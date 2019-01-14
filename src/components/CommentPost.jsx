import React, { Component } from 'react';
import { Button } from '@material-ui/core';
class CommentPost extends Component {
  state = {
    comment: ''
  }



  handleChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  addComment = (event) => {
    event.preventDefault()
    const { comment } = this.state
    const { user } = this.props
    this.props.addComment(user.user_id, comment)
    this.setState({
      comment: ''
    })
  }

  render() {
    return (
      <form onSubmit={this.addComment}>
        <label>Post your comment,  {this.props.user.username}</label>
        <input
          type="text"
          onChange={this.handleChange}
          id="comment"
          value={this.state.comment}
        />
        <Button type="submit" variant="outlined" onSubmit={this.addComment}>
          submit
        </Button>
      </form>
    );
  }
}

export default CommentPost;