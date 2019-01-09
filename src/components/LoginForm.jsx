import React, { Component } from 'react';
import * as api from '../api';
import { Input, Button, Card, CardHeader, Avatar, Typography } from '@material-ui/core';

class LoginForm extends Component {
  state = {
    username: 'jessjelly',
    error: false
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({
      username: value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username } = this.state;
    api
      .getUser(username)
      .then(user => {
        this.props.login(user)
      })
      .catch(error => {
        this.setState({
          error: true,
          username: ''
        })
      })
  }


  componentDidMount() {
    document.body.style.backgroundColor = "white";
  }

  render() {
    const { username, error } = this.state;
    return (
      <div>
        <Card id="login-card" >
          <CardHeader avatar={
            <Avatar aria-label="Northcoders" >
              NCK
              </Avatar>
          } title="" >
          </CardHeader>
          <form onSubmit={this.handleSubmit}>
            <Input
              type="text"
              id="username"
              value={username}
              placeholder="your username"
              onChange={this.handleChange}
            />
            <Button variant="outlined" color="primary" size="small" onClick={this.handleSubmit}>login</Button>
            <Typography id="error" paragraph>
              {error && `Can't find that username. How about jessjelly?`}
            </Typography>
          </form>
        </Card>
      </div>
    );
  }
}

export default LoginForm;