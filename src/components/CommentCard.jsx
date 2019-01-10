import React, { Component } from 'react';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import DeleteComment from './DeleteComment';
import Vote from './Vote';
// import moment from 'moment';

class CommentCard extends Component {
  render() {
    const { comment, article_id, user } = this.props;
    // console.log(comment);
    return (
      <>
        <Card className="commentCard">
          <CardHeader subheader={comment.author}>
          </CardHeader>
          <CardContent>
            <Typography variant="headline">
              {comment.body}
            </Typography>
            <Typography>
              {/* created at: {moment(comment.created_at).format(
                'dddd, MMMM Do YYYY, h:mm a',
              )} */}
              {comment.created_at}
            </Typography>
          </CardContent>
          <DeleteComment user={user} article_id={article_id} comment={comment} />
          <Vote article_id={article_id} votes={comment.votes} comment_id={comment.comment_id} />
        </Card>
        <br />
      </>
    );
  }
}

export default CommentCard;