// import React, { Component } from 'react';
// import * as api from '../api';
// import CommentCard from './CommentCard';
// import CommentPost from './CommentPost';

// class CommentsSideBar extends Component {
//   state = {
//     latestComments: null,
//     isLoading: true
//   }

//   componentDidMount() {
//     this.fetchComments();
//   }

//   // componentDidUpdate() {
//   //   this.fetchComments();
//   // }


//   // addComment = (newComment, username) => {
//   //   const postCommentObj = {
//   //     body: newComment,
//   //     author: username,
//   //     created_at: `${Date.now()}`,
//   //     votes: 0,
//   //     comment_id: `newComment`
//   //   };
//   //   this.setState(prevState => ({
//   //     latestComments: [postCommentObj, ...prevState.latestComments],
//   //     isLoading: false
//   //   }));
//   // };

//   fetchComments = () => {
//     api
//       .getComments(this.props.article_id)
//       .then(comments => {
//         console.log(comments)
//         this.setState({
//           latestComments: comments,
//           isLoading: false
//         });
//       })
//       .catch(err => { });
//   };

//   render() {

//     const { latestComments, isLoading } = this.state;
//     const { article_id, user } = this.props;

//     return (
//       (!isLoading && latestComments) &&
//       <div>
//         {/* test comments
//         <CommentPost user={user}
//           addComment={this.addComment}
//           article_id={article_id} />
//         <br />
//         <h3>Latest Comments</h3> */}

//         {latestComments.map(comment => {
//           return (
//             <div key={comment.comment_id}>
//               <CommentCard
//                 comment={comment}
//                 article_id={article_id}
//                 user={user}
//               //need delete comment option
//               />
//             </div>
//           );
//         })}
//       </div>
//     );
//   }


// }

// export default CommentsSideBar;