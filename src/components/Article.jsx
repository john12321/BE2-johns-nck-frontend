import React, { Component } from 'react';
import * as api from "../api";
import { navigate } from '@reach/router';
import Vote from "./Vote";
import { Card, CardHeader, CardContent, Typography, Button, CardActionArea, CardActions, withStyles } from '@material-ui/core';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import CommentPost from './CommentPost';
import throttle from 'lodash.throttle';
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
    window.addEventListener('scroll', this.throttledScroll)
  }

  componentDidUpdate(prevProps, prevState) {
    const { article_id } = this.props;
    if (article_id !== prevProps.article_id) {
      this.fetchArticle()
      this.setState({ page: 1 }, this.fetchComments)
      window.addEventListener('scroll', this.throttledScroll)
    }
  }

  fetchArticle = () => {
    api
      .getArticle(this.props.article_id)
      .then(article => {
        this.setState({ thisArticle: article });
      })
  }

  fetchComments = () => {
    const { article_id } = this.props
    const { page } = this.state
    api.getComments(article_id, page).then(comments => {
      this.setState((state) => {
        return { comments: [...state.comments, ...comments], isLoading: false }
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
      isLoading, comments
    } = this.state;
    console.log(comments)
    const { user, topic, classes } = this.props;

    const formattedDate = new Date(created_at).toString().slice(0, 16);

    if (isLoading) {
      return (
        <div>Loading...</div>
      )
    } else if (article_id) {
      return (
        <>
          <Card className={classes.card} >
            <CardActionArea>
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
                  {formattedDate}
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
              <CardActions>
                {user.username === author && (
                  <Button size="small" type="submit" onClick={this.removeItem} variant="contained" color="secondary" >
                    Delete
        <DeleteIcon />
                  </Button>)}
              </CardActions>
            </CardActionArea>
            <Vote votes={votes} article_id={article_id} />
          </Card>
          <br />

          <CommentPost addComment={this.addComment} user={user} />

          {comments.map(({ body, comment_id, created_at, author, votes }) => {
            return (
              <div key={comment_id}>
                <br />
                <Card className="commentCard">
                  <CardActionArea>
                    <Typography gutterBottom variant="h5" component="h2">
                      {/* Comment added {formattedDate} */}
                      Comment submitted: {moment(created_at).startOf('day').fromNow()}
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
                    <CardActions>
                      {author === user.username && (
                        <Button size="small" type="submit" onClick={() => this.removeItem(comment_id)} variant="contained" color="secondary" >
                          Delete comment
                      <DeleteIcon />
                        </Button>)}
                    </CardActions>
                    <br />
                  </CardActionArea>
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