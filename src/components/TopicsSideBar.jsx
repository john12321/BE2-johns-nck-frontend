import React, { Component } from 'react';
import TopicPost from './TopicPost';

class TopicsSideBar extends Component {
  state = {

  }
  render() {
    console.log(this.props)
    return (
      <div>
        <TopicPost />
      </div>
    );
  }
}

export default TopicsSideBar;