import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav';
import Articles from './components/Articles';
import Article from './components/Article';
import Footer from './components/Footer';
import Auth from './components/Auth';
import { Router } from '@reach/router';
import * as api from './api';
import Errors from './components/Errors';
import { navigate } from '@reach/router';
import TopicPost from './components/TopicPost';


class App extends Component {
  state = {
    user: null,
    topics: []
  }

  login = (user) => {
    this.setState({
      user
    })
    localStorage.setItem("loginCredentials", JSON.stringify(user));
  }

  fetchTopics = () => {
    api
      .getTopics()
      .then(topics => {
        this.setState({
          topics
        })
      })
  }

  addNewTopic = (topic) => {
    this.setState((state) => {
      return { topics: [...state.topics, topic] }
    })
  }

  componentDidMount() {
    this.fetchTopics();
    this.getLocalUser();
  }


  getLocalUser = () => {
    const storedUser = localStorage.getItem("loginCredentials");
    if (storedUser) this.setState({ user: JSON.parse(storedUser) });
  };


  logoutLocalUser = () => {
    localStorage.clear();
    this.setState({ user: null });
    navigate('/')
  };


  render() {
    const { user, topics } = this.state;
    return (
      <div className="App">
        <Auth user={user} login={this.login}>
          <Nav topics={topics} logoutLocalUser={this.logoutLocalUser} fetchTopics={this.fetchTopics} user={user} />
          <Router className="articles">
            <Articles path="/" topics={topics} user={user} />
            <Articles path="/topics/:topic" topics={topics} user={user} />
            <TopicPost user={user} path="topic/add" topics={topics} addNewTopic={this.addNewTopic} />
            <Articles user={user} path="article/add" topics={topics} />
            <Article path="/:topic/:article_id" topics={topics} user={user} />
            <Errors default />
          </Router>
          <Footer />
        </Auth>
      </div>
    );
  };
};


export default App;
