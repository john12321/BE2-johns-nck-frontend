import React, { Component } from 'react';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import DeleteArticle from './DeleteArticle';

class ArticleCard extends Component {


  render(props) {
    const { article, user } = this.props;
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
        <Card className="articleCard">
          <CardHeader title={title} subheader={author}>
          </CardHeader>
          <CardContent>
            <Typography variant="headline">
              {topic}
            </Typography>
            {/* <Typography variant="overline">
              {body}
            </Typography> */}
            <Typography>
              created at: {formattedDate}
            </Typography>
          </CardContent>
          <DeleteArticle user={user} article={article} />
        </Card>
        <br />
      </>
    );
  }
}

export default ArticleCard;