import React, { Component } from 'react';
import * as api from "../api";
import { navigate } from '@reach/router';
import Vote from "./Vote";
import { Card, CardHeader, CardContent, Typography, Button } from '@material-ui/core';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import CommentPost from './CommentPost';
import throttle from 'lodash.throttle';


class Article extends Component {
  state = {
    thisArticle: {},
    isLoading: true,
    comments: [],
    page: 1,
  }

  componentDidMount() {
    this.fetchArticle();
    this.fetchComments();
  }

  fetchArticle = () => {
    api
      .getArticle(this.props.article_id)
      .then(article => {
        this.setState({ thisArticle: article, isLoading: false });
      })
  }

  fetchComments = () => {
    const { article_id } = this.props
    const { page } = this.state
    api.getComments(article_id, page).then(comments => {
      this.setState((state) => {
        return { comments: [...state.comments, ...comments] }
      })
      if (comments.length < 10) {
        window.removeEventListener('scroll', this.throttledScroll)
      }
    }).catch(() => {
      window.removeEventListener('scroll', this.throttledScroll)
    })
  }



  removeItem = () => {
    api
      .deleteItem(this.props.article_id)
      .then(() => {
        navigate('/')
      });
  }

  addComment = (comment) => {
    const { article_id, user: { user_id, username } } = this.props
    api.postComment(article_id, user_id, comment).then(newComment => {
      const newCommentData = { ...newComment, author: username }
      this.setState((state) => {
        return {
          comments: [newCommentData, ...state.comments]
        }
      })
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
      isLoading, comments, page
    } = this.state;
    const { user } = this.props;

    if (isLoading) {
      return (
        <div>Loading...</div>
      )
    } else if (article_id) {
      return (
        <>
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
          <br />
          <CommentPost addComment={this.addComment} user={user} />
          <br />

          <h2>Comments</h2>

          {comments.map(({ body, comment_id, created_at, author, votes }) => {
            return (
              <Card key={comment_id} className="commentCard">
                <CardHeader subheader={author}>
                </CardHeader>
                <CardContent>
                  <Typography variant="headline">
                    {title}
                  </Typography>
                  <p>{body}</p>
                  <span>submitted:{moment(created_at).startOf('day').fromNow()}</span>
                  <br />
                  <span>Comment count: {comment_count}</span>
                </CardContent>
                {user.username === author && (
                  <Button size="small" type="submit" onClick={() => this.removeItem(comment_id)} variant="contained" color="secondary" >
                    Delete comment
                      <DeleteIcon />
                  </Button>)}
                <br />
                <Vote votes={votes} article_id={article_id} comment_id={comment_id} />
              </Card>
            )
          })
          }

        </>


      );
    }

  }
}

export default Article;