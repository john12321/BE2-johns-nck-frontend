import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Articles from './components/Articles';
import SideBar from './components/SideBar';
import Footer from './components/Footer';
import Auth from './components/Auth';

class App extends Component {
  state = {
    user: ''
  }

  login = (user) => {
    this.setState({
      user
    })
  }

  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <Auth user={user} login={this.login}>
          <Header />
          <Nav />
          <Articles />
          <SideBar />
          <Footer />
        </Auth>
      </div>
    );
  }
}

export default App;
