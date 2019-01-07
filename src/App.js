import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Articles from './components/Articles';
import SideBar from './components/SideBar';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Nav />
        <Articles />
        <SideBar />
        <Footer />
      </div>
    );
  }
}

export default App;
