import React, { Component } from 'react';
import { Button, Card, InputLabel, Input, FormControl, CardActionArea, CardActions } from '@material-ui/core';
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
    this.props.addComment(comment)
    this.setState({
      comment: ''
    })
  }

  render() {
    return (
      <Card style={{ backgroundColor: '#72BCD4', padding: 4, borderRadius: 25 }}>
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