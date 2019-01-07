import React, { Component } from 'react';
import * as api from '../api';

class Articles extends Component {

  state = {
    articles: [],
    isLoading: true
  }

  componentDidMount() {
    this.fetchArticles();
    this.setState({ isLoading: false });
  }

  fetchArticles() {
    api
      .getArticles()
      .then(article => {
        this.setState(prevState => ({
          articles: article
        }));
      })
  }

  render(props) {

    return (
      <div className="articles">
        <span>articles will go here...</span>
      </div>
    );
  }
}

export default Articles;