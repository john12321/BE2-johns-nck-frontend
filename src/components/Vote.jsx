import React, { Component } from 'react';
import * as api from '../api';
import { Button } from '@material-ui/core';
import { ThumbUp, ThumbDown } from '@material-ui/icons/';

class Vote extends Component {

  state = {
    voteChange: 0
  }

  vote = (increment) => {
    const { article_id, comment_id } = this.props;
    api
      .updateVotes(article_id, increment, comment_id)
      .catch(err =>
        this.setState(state => ({
          voteChange: state.voteChange - increment,
        })),
      );
    this.setState(state => ({
      voteChange: state.voteChange + increment,
    }));
  };


  render() {
    const { voteChange } = this.state;
    const { votes } = this.props;
    return (
      <div>
        <Button disabled={voteChange === 1} type="submit" onClick={() => this.vote(1)}><ThumbUp style={{ color: 'blue' }}></ThumbUp></Button>
        {votes + voteChange}
        <Button disabled={voteChange === -1} type="submit" onClick={() => this.vote(-1)}><ThumbDown style={{ color: 'red' }}></ThumbDown></Button>
      </div>
    );
  }
}


export default Vote;


