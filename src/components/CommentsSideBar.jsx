import React, { Component } from 'react';
import * as api from '../api';
import CommentCard from './CommentCard';
import CommentPost from './CommentPost';

class CommentsSideBar extends Component {
  state = {
    latestComments: [],
    isLoading: true
  }

  componentDidMount() {
    this.fetchComments();
  }


  fetchComments = () => {
    api
      .getComments(this.props.article_id)
      .then(comments => {
        this.setState({
          latestComments: comments,
          isLoading: false
        });
      })
      .catch(err => { });
  };

  addComment = (newComment, username) => {
    const postCommentObj = {
      body: newComment,
      author: username,
      created_at: `${Date.now()}`,
      votes: 0,
      comment_id: `newComment`
    };
    this.setState(prevState => ({
      latestComments: [postCommentObj, ...prevState.latestComments],
      isLoading: false
    }));
  };

  render() {

    const { latestComments } = this.state;
    const { article_id, user } = this.props;

    return (
      <div>
        <h3>Latest Comments</h3>
        <CommentPost user={user}
          addComment={this.addComment}
          article_id={article_id} />
        {latestComments.map(comment => {
          return (
            <div key={comment.comment_id}>
              <CommentCard
                comment={comment}
                article_id={article_id}
                user={user}
              //need delete comment option
              />
            </div>
          );
        })}
      </div>
    );
  }


}

export default CommentsSideBar;