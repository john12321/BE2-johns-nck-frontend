import React, { Component } from 'react';
import * as api from "../api";
import DeleteArticle from './DeleteArticle';
import Vote from "./Vote";
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import moment from 'moment';


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
          <CardHeader subheader={title}>
          </CardHeader>
          <CardContent>
            <Typography variant="headline">
              {author}
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
            <DeleteArticle user={user} article_id={article_id} author={author} />
          )}
          <br />
          <Vote votes={votes} article_id={article_id} />
          <br />
        </Card>
      );
    }

  }
}

export default Article;