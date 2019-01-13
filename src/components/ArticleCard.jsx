import React, { Component } from 'react';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import { Link } from '@reach/router';
import Vote from './Vote';

class ArticleCard extends Component {


  render(props) {
    const { article, user } = this.props;
    const {
      article_id,
      author,
      // body,
      // comment_count,
      created_at,
      title,
      topic,
      votes
    } = article

    const formattedDate = new Date(created_at).toString().slice(0, 21);


    return (
      <>
        <br />
        <Card className="articleCard">
          <h2 className="articleLink"><Link to={`/${topic}/${article_id}`}>{title}</Link></h2>
          <CardHeader subheader={author}>
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
          <Vote article_id={article_id} votes={votes} />
        </Card>
        <br />
      </>
    );
  }
}

export default ArticleCard;