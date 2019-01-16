import React, { Component } from 'react';
import * as api from '../api';
import ArticleCard from './ArticleCard';
import { Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { Link } from '@reach/router';
import throttle from 'lodash.throttle';


class Articles extends Component {

  state = {
    articles: [],
    isLoading: true,
    page: 1,
    err: false,
    currentQuery: "",
    atEnd: false
  }

  componentDidMount() {
    this.setState({
      page: 1
    })
    this.fetchArticles();
    window.addEventListener('scroll', this.throttleScroll);
  }

  componentDidUpdate(prevProps, prevState) {
    const { topic } = this.props;
    if (topic !== prevProps.topic) {
      this.fetchArticles(topic);
    }
    if (this.state.page !== prevState.page) {
      this.fetchArticles(topic);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.throttleScroll);
    this.setState({ page: 1 })
  }

  fetchArticles() {
    const { topic } = this.props;
    const { page, currentQuery } = this.state;
    api
      .getArticles(topic, page, currentQuery)
      .then(articles => {
        this.setState(prevState => {
          if (page === 1) {
            return { articles, isLoading: false };
          } else {
            return {
              articles: [...prevState.articles, ...articles],
              isLoading: false
            };
          }
        });
        if (articles.length < 10) {
          this.setState({ atEnd: true, page: 1 })
        }
      })
      .catch(() => {
        window.removeEventListener('scroll', this.throttleScroll);
        this.setState({ err: true, articles: [], page: 1 })
        // console.log(this.state)
      })
  }

  handleScroll = () => {
    console.log('scrolling', window.scrollY)
    const scrolledHeight = window.scrollY + window.innerHeight;
    const bottom = document.body.scrollHeight - 200;
    if (scrolledHeight >= bottom) {
      this.setState((state) => {
        return { page: state.page + 1 }
      })
    }
    // // test code below--------------------------------
    // else {
    //   console.log('not firing');
    // }
  };

  throttleScroll = throttle(this.handleScroll, 1500);


  updatecurrentQuery = (sort_by) => {
    this.state({ currentQuery: { sort_by } });
  }


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
                <ArticleCard class="test" article={article} user={this.props.user} fetchArticles={this.fetchArticles} />
              </div>
            )
          })}
        </div>
      )
      return (
        <>
          <section >
            <form autoComplete="off">
              <FormControl style={{ minWidth: 120 }} >
                <InputLabel htmlFor="filterQuery">Filter by  </InputLabel>
                <Select
                  value={this.state.currentQuery}
                >
                  <MenuItem value="">
                    <em>No filter</em>
                  </MenuItem>
                  <MenuItem onClick={(event) => this.handleClick(event)} value={"created_at"}>Newest </MenuItem>
                  <MenuItem onChange={(event) => this.handleClick(event)} value={"votes"}>Most liked</MenuItem>
                  <MenuItem onChange={(event) => this.handleClick(event)} value={"comment_count"}>Most discussed</MenuItem>
                </Select>
              </FormControl>
            </form>
          </section>
          <section>
            {cardContent}
          </section>

        </>
      )
    }
  }

  handleClick = (event) => {
    event.preventDefault();
    const { value } = event.target
    this.setState({
      currentQuery: value
    }, () => console.log(this.state))
  }

}

export default Articles;