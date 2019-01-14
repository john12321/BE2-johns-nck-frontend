// import React, { Component } from 'react';
// import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

// class Filters extends Component {
//   state = {
//     currentFilter: ''
//   }

//   // handleChange = (event) => {
//   //   const { currentFilter } = event.target
//   //   this.setState({
//   //     sort_by: value
//   //   }, () => console.log(this.state))
//   // }

//   // componentDidUpdate() {
//   //   this.fetchArticles(value);
//   // }


//   render() {
//     console.log(this.props);
//     console.log(this.state)
//     return (

//       <form autoComplete="off">
//         <FormControl style={{ minWidth: 120 }} >
//           <InputLabel htmlFor="filterQuery">Filter by  </InputLabel>
//           <Select
//             value={this.state.currentFilter}
//           >
//             <MenuItem value="">
//               <em>None</em>
//             </MenuItem>
//             <MenuItem value={"created_at"}>Newest </MenuItem>
//             <MenuItem value={"votes"}>Most liked</MenuItem>
//             <MenuItem value={"comment_count"}>Most discussed</MenuItem>
//           </Select>
//         </FormControl>
//       </form>
//       // <div>
//       //   <Card>
//       //     <form>
//       //       <label htmlFor="sort_by">sort by</label>
//       //       <select id="sort_by" onChange={this.handleChange}>
//       //         <option value="title">Title</option>
//       //         <option value="author">Author</option>
//       //         <option value="created_at">Date</option>
//       //         <option value="votes">Votes</option>
//       //         <option value="comments">Comments</option>
//       //       </select>
//       //     </form>
//       //   </Card>
//       // </div>
//       // </form>
//     );
//   }

//   handleChange = event => {
//     const { className, value } = event.target;
//     this.setState({ [className]: value });
//   };
// }

// export default Filters;











