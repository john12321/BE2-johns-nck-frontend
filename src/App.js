import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Articles from './components/Articles';
import Article from './components/Article';
import SideBar from './components/SideBar';
import Footer from './components/Footer';
import Auth from './components/Auth';
import { Router } from '@reach/router';
import * as api from './api';

class App extends Component {
  state = {
    user: '',
    topics: []
  }

  login = (user) => {
    this.setState({
      user
    })
  }

  componentDidMount() {
    this.fetchTopics();
  }

  fetchTopics() {
    api
      .getTopics()
      .then(topics => {
        this.setState({
          topics: topics
        })
      })
  }

  render() {
    const { user, topics } = this.state;
    return (
      <div className="App">
        <Auth user={user} login={this.login}>
          <Header user={user} />
          <Nav topics={topics} />
          <Router className="articles">
            <Articles user={user} path="/" />
            <Articles user={user} path="/topics/:topic" />
            <Article path="/:topic/:article_id" user={user} />
          </Router>
          <SideBar user={user} />
          <Footer />
        </Auth>
      </div>
    );
  }
}

export default App;
