import React, { Component } from 'react';
import { Card } from '@material-ui/core';

class CommentCard extends Component {
  render() {
    const { comment, article_id, user } = this.props;
    // console.log(comment);
    return (
      <Card>
        <br />
        {comment.body}
        {article_id}
        {user.user_id}
        <br />
      </Card>
    );
  }
}

export default CommentCard;