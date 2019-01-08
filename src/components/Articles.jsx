import React, { Component } from 'react';
import * as api from '../api';
import ArticleCard from './ArticleCard';


class Articles extends Component {

  state = {
    articles: [],
    isLoading: true
  }

  componentDidMount() {
    this.fetchArticles();
    this.setState({ isLoading: false });
  }

  componentDidUpdate(prevProps, prevState) {
    const { slug } = this.props;
    if (slug !== prevProps.slug) {
      this.fetchArticles(slug);
    }
  }

  fetchArticles(topic) {
    api
      .getArticles(topic)
      .then(articles => {
        this.setState(prevState => ({
          articles
        }));
      })
  }
  render(props) {
    const { articles } = this.state
    let cardContent = null;
    if (!this.state.isLoading) {
      cardContent = (
        <div className="cardContent">
          {articles.map(article => {
            return (
              <div
                key={article.article_id}
              >
                <ArticleCard article={article} user={this.props.user} />
              </div>
            )
          })}
        </div>
      )
      return (
        <div>
          {cardContent}
        </div>
      )
    } else return <h1>loading...</h1>
  }

}

export default Articles;