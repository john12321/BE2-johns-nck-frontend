import React, { Component } from 'react';
import * as api from '../api';
import CommentCard from './CommentCard';

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

  render() {

    const { latestComments } = this.state;
    const { article_id, user } = this.props;
    console.log()
    return (
      <div>
        <h3>Comments go here</h3>
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