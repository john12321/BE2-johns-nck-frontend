import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Articles from './components/Articles';
import Article from './components/Article';
import SideBar from './components/SideBar';
// import Footer from './components/Footer';
import Auth from './components/Auth';
import { Router } from '@reach/router';
import * as api from './api';
import Errors from './components/Errors';
import { navigate } from '@reach/router';



class App extends Component {
  state = {
    user: '',
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
    this.setState({ user: '' });
    navigate('/')
  };


  render() {
    const { user, topics } = this.state;
    return (
      <div className="App">
        <Auth user={user} login={this.login}>
          {/* <Header user={user} logoutLocalUser={this.logoutLocalUser} /> */}
          <Nav topics={topics} logoutLocalUser={this.logoutLocalUser} />

          <Router className="articles">
            <Articles path="/" topics={topics} />
            <Articles path="/topics/:topic" topics={topics} />
            <Articles user={user} path="topic/add" topics={topics} />
            <Articles user={user} path="article/add" topics={topics} />
            <Article path="/:topic/:article_id" topics={topics} user={user} removeItem={this.removeItem} />
            <Errors default />
          </Router>
          {/* <SideBar user={user} topics={topics} fetchTopics={this.fetchTopics} addNewTopic={this.addNewTopic} /> */}
          {/* <Footer /> */}
        </Auth>
      </div>
    );
  }
}

export default App;
