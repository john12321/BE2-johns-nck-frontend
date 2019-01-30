import React, { Component } from 'react';
import * as api from "../api";
import { navigate } from '@reach/router';
import Vote from "./Vote";
import { Card, CardHeader, CardContent, Typography, Button, CardActionArea, withStyles } from '@material-ui/core';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import CommentPost from './CommentPost';
import throttle from 'lodash.throttle';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';

const styles = {
  card: {
    maxWidth: 3000,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 25,
  },
  media: {
    height: 140,
  },
};

class Article extends Component {
  state = {
    article: {},
    isLoading: true,
    comments: [],
    page: 1,
    err: false,
  }

  componentDidMount() {
    this.fetchArticle();
    this.fetchComments();
    window.addEventListener('scroll', this.throttledScroll)
  }

  componentDidUpdate(prevProps, prevState) {
    const { article_id } = this.props;
    if (article_id !== prevProps.article_id) {
      this.fetchArticle()
      this.setState({ page: 1, comments: [] }, this.fetchComments)
      window.addEventListener('scroll', this.throttledScroll)
    }
  }

  fetchArticle = () => {
    api
      .getArticle(this.props.article_id)
      .then(article => {
        this.setState({ article });
      })
      .then(() => this.setState({ isLoading: false }))
      .catch((err) => {
        this.setState({ err: true })
      })
  }

  fetchComments = () => {
    const { article_id } = this.props
    const { page } = this.state
    api.getComments(article_id, page).then(comments => {
      this.setState((state) => {
        return { comments: [...state.comments, ...comments], isLoading: false }
      })
      if (comments.length < 5) {
        window.removeEventListener('scroll', this.throttledScroll)
      }
    }).catch(() => {
      window.removeEventListener('scroll', this.throttledScroll)
    })
  }

  removeItem = (comment_id) => {
    api
      .deleteItem(this.props.article_id, comment_id)
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

  handleScroll = () => {
    const scrolledHeight = window.innerHeight + window.scrollY
    const bottom = document.body.scrollHeight - 100
    if (scrolledHeight >= bottom) {
      this.setState((state) => {
        return { page: state.page + 1 }
      }, this.fetchComments)
    }
  }

  throttledScroll = throttle(this.handleScroll, 2000);

  render() {
    const { article: {
      title,
      votes,
      author,
      created_at,
      body,
      comment_count,
      article_id
    }, isLoading, comments } = this.state;
    const { user, topic, classes } = this.props;

    if (isLoading || !article_id) {
      return (
        <Loader type="ThreeDots" color="white" height={200} width={200} />
      )
    } else {
      return (
        <>
          <Card className={classes.card} >
            <CardHeader subheader={author}>
            </CardHeader>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {title}
              </Typography>
              <Typography variant="overline" style={{ color: '#6a00b7' }} >
                {topic}
              </Typography>
              <Typography>
                {`Posted: ${moment(created_at).startOf('second').fromNow()}`}
              </Typography>
              <br />
              <Typography>
                {body}
              </Typography>
              <br />
              <Typography>
                Comments: {comment_count}
              </Typography>
            </CardContent>
            {user.username === author && (
              <Button size="small" type="submit" onClick={this.removeItem} variant="contained" color="secondary" style={{ display: 'flex', alignContent: 'center' }} >
                Delete
        <DeleteIcon />
              </Button>)}
            <Vote votes={votes} article_id={article_id} />
          </Card>
          <br />

          <CommentPost addComment={this.addComment} user={user} />

          {(comments.length > 0) && comments.map(({ body, comment_id, created_at, author, votes }) => {
            return (
              <div key={comment_id}>
                <br />
                <Card className="commentCard">
                  <CardActionArea>
                    <Typography gutterBottom variant="h5" component="h2">
                      {/* Comment added {formattedDate} */}
                      {`Comment posted: ${moment(created_at).startOf('second').fromNow()}`}
                    </Typography>
                    <CardHeader subheader={author}>
                    </CardHeader>
                    <CardContent>
                      <Typography >
                        {body}
                      </Typography>
                      <br />
                      <Typography >
                        Comment id: {comment_id}
                      </Typography>
                    </CardContent>
                    <br />
                  </CardActionArea>
                  {author === user.username && (
                    <Button size="small" type="submit" onClick={() => this.removeItem(comment_id)} variant="contained" color="secondary" >
                      Delete comment
                      <DeleteIcon />
                    </Button>)}
                  <Vote votes={votes} article_id={article_id} comment_id={comment_id} />
                </Card>
                <br />
              </div>
            )
          }
          )}
        </>
      )
    }

  }

};

Article.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Article);