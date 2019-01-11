import React, { Component } from 'react';
import ArticlePost from './ArticlePost';

class ArticleSideBar extends Component {
  state = {

  }

  render() {
    const { user, topics } = this.props;
    return (
      <div>
        <br />
        <ArticlePost user={user} topics={topics} />
      </div>
    );
  }
}

export default ArticleSideBar;