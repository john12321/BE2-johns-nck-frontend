import React, { Component } from 'react';
import moment from 'moment';
import { Card, CardHeader, CardContent, CardActionArea, Typography, withStyles, Avatar } from '@material-ui/core';
import { navigate } from '@reach/router';
import Vote from './Vote';
import PropTypes from 'prop-types';
import 'typeface-roboto';

const styles = theme => ({
  card: {
    maxWidth: 3000,
    backgroundColor: '#fff',
    borderRadius: 25,
    font: 'typeface-roboto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  media: {
    height: 140,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
});



class ArticleCard extends Component {


  render() {
    const { article, classes } = this.props;
    const {
      article_id,
      title,
      votes,
      created_at,
      topic,
      author,
      avatar_url,
      comment_count,
    } = article;


    return (
      <>
        <br />
        <Card className={classes.card}>
          <CardActionArea onClick={() => navigate(`/${topic}/${article_id}`)}>
            <Avatar className={classes.avatar} style={{ height: 40, width: 40, }}>
              <img src={avatar_url} alt={author} style={{ height: 60, width: 60, padding: 0 }}></img>
            </Avatar>
            <CardHeader subheader={author}  >
            </CardHeader>
            <CardContent >
              <Typography gutterBottom variant="h5" component="h2" >
                {title}
              </Typography>
              <Typography variant="overline" style={{ color: '#C82B3C' }} >
                {topic}
              </Typography>
              <Typography variant="h6" style={{ color: '#72BCD4' }}>
                {`Posted: ${moment(created_at).startOf('second').fromNow()}`}
              </Typography>
              <br />
              <Typography >
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
  article: PropTypes.object,
};

export default withStyles(styles)(ArticleCard);