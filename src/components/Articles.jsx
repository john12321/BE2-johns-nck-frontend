import React, { Component } from 'react';
import * as api from '../api';
import ArticleCard from './ArticleCard';
import { Button } from '@material-ui/core';
import { Link } from '@reach/router';
import throttle from 'lodash.throttle';


class Articles extends Component {

  state = {
    articles: [],
    // isLoading: true,
    page: 1,
    err: false
  }

  componentDidMount() {
    this.fetchArticles();
    window.addEventListener('scroll', this.throttleScroll);
  }

  componentDidUpdate(prevProps, prevState) {
    const { topic } = this.props;
    if (topic !== prevProps.topic) {
      this.fetchArticles(topic);
      window.addEventListener('scroll', this.throttleScroll)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.throttleScroll)
  }

  fetchArticles() {
    const { topic } = this.props;
    const { page } = this.state;
    api
      .getArticles(topic, page)
      .then(articles => {
        this.setState({
          articles
        });
        if (articles.length < 10) {
          window.removeEventListener('scroll', this.throttleScroll);
        }
      })
      .catch(() => {
        window.removeEventListener('scroll', this.throttleScroll);
        this.setState({ err: true, articles: [] })
        // console.log(this.state)
      })
  }

  handleScroll = () => {
    // console.log(window.scrollY)
    const scrolledHeight = window.scrollY;
    const bottom = document.body.scrollHeight - 100;
    if (scrolledHeight >= bottom) {
      this.setState((state) => {
        return { page: state.page + 1 }
      }, this.fetchArticles)
    }
  };

  throttleScroll = throttle(this.handleScroll, 1500);


  render() {
    const { articles } = this.state
    let cardContent = null;


    if (articles.length < 1) {
      return (
        <>
          <p>No articles for this topic yet. Be the first!</p>
          <Button >
            <Link to='/article/add' className="addBtn" style={{ textDecoration: 'none' }}>New Article</Link>
          </Button>
        </>
      )
    } else {

      cardContent = (
        <div className="cardContent">
          {articles.map(article => {
            return (
              <div
                key={article.article_id}
              >
                <ArticleCard class="test" article={article} user={this.props.user} />
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
    }
  }
}

export default Articles;