import React, { Component } from 'react';
import TopicPost from './TopicPost';

class TopicsSideBar extends Component {
  state = {

  }
  render() {
    const { user, topics, fetchTopics } = this.props
    return (
      <div>
        <TopicPost user={user} topics={topics} fetchTopics={fetchTopics} />
      </div>
    );
  }
}

export default TopicsSideBar;