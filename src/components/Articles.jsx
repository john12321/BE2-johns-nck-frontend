import React, { Component } from 'react';
import * as api from '../api';
import ArticleCard from './ArticleCard';
import { FormControl, FormGroup, Card, Typography } from '@material-ui/core';
import throttle from 'lodash.throttle';
import ArticlePost from './ArticlePost';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Loader from 'react-loader-spinner';
import lodash from 'lodash';
import PropTypes from 'prop-types';



class Articles extends Component {

  state = {
    articles: [],
    isLoading: true,
    page: 1,
    err: false,
    atEnd: false,
    sortBy: '',
    sortAsc: false,
  }

  componentDidMount() {
    this.fetchArticles();
    window.scrollTo(0, 0);
    window.addEventListener('scroll', this.throttleScroll);
  }

  componentDidUpdate(prevProps, prevState) {
    const { sortBy } = this.state;
    const { topic } = this.props;
    if (sortBy !== prevState.sortBy) {
      this.setState({ page: 1, articles: [], atEnd: false, err: false }, this.fetchArticles)
      window.scrollTo(0, 0);
    }
    else if (topic !== prevProps.topic) {
      this.setState({ page: 1, articles: [], atEnd: false, err: false }, this.fetchArticles);
      window.scrollTo(0, 0)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.throttleScroll);
  };


  handleChange = (event) => {
    const { value } = event;
    this.setState({
      sortBy: value
    }, this.fetchArticles)
  }

  fetchArticles() {
    const { topic } = this.props;
    const { page, sortBy, sortAsc } = this.state;
    api
      .getArticles(topic, page, sortBy, sortAsc)
      .then(articles => {
        this.setState(prevState => {
          if (page === 1) {
            return { articles, isLoading: false };
          } else {
            const newArticles = lodash.uniqBy([...prevState.articles, ...articles], 'article_id');
            return {
              articles: newArticles,
              isLoading: false
            };
          }
        });
        if (articles.length < 5) {
          this.setState({ atEnd: true })
        }
      })
      .catch(() => {
        window.removeEventListener('scroll', this.throttleScroll);
        this.setState({ err: true, atEnd: true, articles: [] })
      })
  }

  handleScroll = () => {
    const scrolledHeight = window.scrollY + window.innerHeight;
    const bottom = document.body.scrollHeight - 200;
    if (scrolledHeight >= bottom) {
      this.setState((state) => {
        return { page: state.page + 1 }
      }, this.fetchArticles)
    }
  };

  throttleScroll = throttle(this.handleScroll, 1500);


  render() {
    const { articles, atEnd, err, sortBy, isLoading } = this.state;
    const { topics } = this.props;
    let cardContent = null;

    cardContent = (
      <div className="cardContent">
        {articles.map(article => {
          return (
            <div
              key={article.article_id}
            >
              <ArticleCard article={article} fetchArticles={this.fetchArticles} />
            </div>
          )
        })}
      </div>)
    if (isLoading) {
      return (
        <Loader type="ThreeDots" color="white" height={200} width={200} />
      )
    } else if (err) {
      return (
        <>
          <ArticlePost topics={topics} user={this.props.user} sortBy={sortBy} />
        </>
      )
    }
    else if (atEnd && !err) {
      return (
        <>
          <ArticlePost topics={this.props.topics} user={this.props.user} topic={this.props.topic} />
        </>
      )
    }
    else return (
      <>
        <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: '0.9', backgroundColor: '#72BCD4' }}>
          <FormGroup style={{ paddingTop: 60 }} row>
            <FormControl>
              <Dropdown
                options={[
                  { value: "created_at", label: "Latest" },
                  { value: "comment_count", label: "Most discussed" },
                  { value: "votes", label: "Most popular" },
                ]}
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControl>
              {/* <Sort /> */}
            </FormControl>
          </FormGroup>
          {cardContent}
        </Card>
      </>
    )
  }
}

Articles.propTypes = {
  topics: PropTypes.array,
  user: PropTypes.object,
};

export default Articles;