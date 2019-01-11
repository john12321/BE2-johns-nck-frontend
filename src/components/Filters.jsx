import React, { Component } from 'react';
import { Card, Button } from '@material-ui/core';

class Filters extends Component {
  state = {
    sort_ascending: false,
    sort_by: true
  }


  render() {
    return (
      <div>
        <Card>
          <form>
            <label htmlFor="sortBy">sort by</label>
            <select id="sort_by" onChange={this.handleChange}>
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option
                value="created_at">Date</option>
              <option value="votes">Votes</option>
              <option value="comments">Comments</option>
            </select>
            <Button type="submit" onClick={this.handleClick}>filter articles</Button>
          </form>
        </Card>
      </div>
    );
  }

  handleChange = event => {
    const { className, value } = event.target;
    this.setState({ [className]: value });
  };
}






export default Filters;