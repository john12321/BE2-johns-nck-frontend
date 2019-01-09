import React, { Component } from 'react';

class CommentCard extends Component {
  render() {
    const { comment, article_id, user } = this.props;
    // console.log(comment);
    return (
      <div>
        <br />
        {comment.body}
        {article_id}
        {user.user_id}
        <br />
      </div>
    );
  }
}

export default CommentCard;