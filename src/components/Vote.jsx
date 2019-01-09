import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { ThumbUp, ThumbDown } from '@material-ui/icons/';

class Vote extends Component {

  state = {
    voteChange: 0
  }


  render() {
    const { votes } = this.props;
    return (
      <div>
        <Button><ThumbUp></ThumbUp></Button>
        {votes}
        <Button><ThumbDown>down</ThumbDown></Button>
      </div>
    );
  }
}

export default Vote;


// import React, { Component } from 'react';

// class VoteArticle extends Component {

//   render() {
//     const {
//       votes,
//       article_id
//       // voteType
//     } = this.props;
//     return (
//       <div>
//         this is where votes will go
//       </div>
//     );
//   }
// }

// export default VoteArticle;