import React, { Component } from 'react';
import * as api from "../api";
import { navigate } from '@reach/router';
import Vote from "./Vote";
import { Card, CardHeader, CardContent, Typography, Button } from '@material-ui/core';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';




class Article extends Component {
  state = {
    thisArticle: {},
    isLoading: true
  }

  componentDidMount() {
    this.fetchArticle();
  }

  fetchArticle = () => {
    api
      .getArticle(this.props.article_id)
      .then(article => {
        this.setState({ thisArticle: article, isLoading: false });
      })
  }

  removeItem = () => {
    api
      .deleteItem(this.props.article_id)
      .then(() => {
        navigate('/')
      });
  }


  render() {

    const {
      thisArticle: {
        title,
        votes,
        author,
        created_at,
        body,
        comment_count,
        article_id
      },
      isLoading
    } = this.state;
    const { user } = this.props;

    if (isLoading) {
      return (
        <div>Loading...</div>
      )
    } else {
      return (
        <Card className="singleArticleCard" >
          <CardHeader subheader={author}>
          </CardHeader>
          <CardContent>
            <Typography variant="headline">
              {title}
            </Typography>
            <p>{body}</p>
            <span>Creation date:{moment(created_at).format(
              'dddd, MMMM Do YYYY, h:mm a',
            )}</span>
            <br />
            <span>Comment count: {comment_count}</span>
          </CardContent>
          <br />
          {user.username === author && (
            <Button size="small" type="submit" onClick={this.removeItem} variant="contained" color="secondary" >
              Delete
        <DeleteIcon />
            </Button>)}
          <br />
          <Vote votes={votes} article_id={article_id} />
          <br />
        </Card>
      );
    }

  }
}

export default Article;