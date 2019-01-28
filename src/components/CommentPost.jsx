import React, { Component } from 'react';
import { Button, Card, InputLabel, Input, FormControl, CardActionArea } from '@material-ui/core';
class CommentPost extends Component {
  state = {
    comment: ''
  }



  handleChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  addComment = (event) => {
    event.preventDefault()
    const { comment } = this.state
    const { user } = this.props
    this.props.addComment(user.user_id, comment)
    this.setState({
      comment: ''
    })
  }

  render() {
    return (
      <Card style={{ backgroundColor: '#c00000', padding: 4 }}>
        <form onSubmit={this.addComment}>
          <CardActionArea>
            <FormControl>
              <InputLabel>Post your comment</InputLabel>
              <Input
                type="text"
                onChange={this.handleChange}
                id="comment"
                value={this.state.comment}
              />
            </FormControl>
          </CardActionArea>
          <Button style={{ backgroundColor: '#fffffe' }} type="submit" variant="outlined" onSubmit={this.addComment}>
            submit
        </Button>
        </form>
      </Card>
    );
  }
}

export default CommentPost;