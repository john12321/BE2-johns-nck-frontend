import React, { Component } from 'react';
import { Card, CardHeader, CardContent, CardActionArea, Typography, withStyles } from '@material-ui/core';
import { Link, navigate } from '@reach/router';
import Vote from './Vote';
import PropTypes from 'prop-types';

const styles = {
  card: {
    maxWidth: 3000,
    backgroundColor: '#fff',
  },
  media: {
    height: 140,
  },
};


class ArticleCard extends Component {


  render() {
    const { article, classes } = this.props;
    const {
      article_id,
      author,
      comment_count,
      created_at,
      title,
      topic,
      votes
    } = article

    const formattedDate = new Date(created_at).toString().slice(0, 16);



    return (
      <>
        <br />
        <Card className={classes.card}>
          <CardActionArea onClick={() => navigate(`/${topic}/${article_id}`)}>
            <CardHeader subheader={author}>
            </CardHeader>
            <CardContent >
              <Typography gutterBottom variant="h5" component="h2">
                {title}
              </Typography>
              <Typography variant="overline" style={{ color: '#6a00b7' }} >
                {topic}
              </Typography>
              <Typography>
                {formattedDate}
              </Typography>
              <br />
              <Typography>
                Comments: {comment_count}
              </Typography>
            </CardContent>
          </CardActionArea>
          <Vote article_id={article_id} votes={votes} />
        </Card>
        <br />
      </>
    );
  }
}

ArticleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ArticleCard);