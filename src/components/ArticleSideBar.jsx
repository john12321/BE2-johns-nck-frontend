import React, { Component } from 'react';
import ArticlePost from './ArticlePost';

class ArticleSideBar extends Component {
  state = {

  }

  render() {
    const { user, topics } = this.props;
    return (
      <div>
        <section>Post a new article here</section>
        <ArticlePost user={user} topics={topics} />
      </div>
    );
  }
}

export default ArticleSideBar;