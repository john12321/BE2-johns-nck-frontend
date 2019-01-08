import React from 'react';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';

const ArticleCard = ({ article, user }) => {
  // console.log(user)
  const {
    // article_id,
    author,
    // body,
    // comment_count,
    created_at,
    title,
    topic,
    // votes
  } = article

  const formattedDate = new Date(created_at).toString().slice(0, 21);

  return (
    <>
      <br />
      <Card>
        <CardHeader title={title} subheader={author}>
        </CardHeader>
        <CardContent>
          <Typography>
            topic: {topic}
          </Typography>
          <Typography>
            created at: {formattedDate}
          </Typography>
        </CardContent>
      </Card>
      <br />
    </>
  );
};

export default ArticleCard;