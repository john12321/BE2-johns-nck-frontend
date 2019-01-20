import React, { Component } from 'react';
import * as api from '../api';
import { Avatar, Input, InputLabel, Button, Card, CardHeader, Typography, CssBaseline, FormControl, FormControlLabel, Checkbox, Paper, withStyles } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PropTypes from 'prop-types';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});


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

  render() {
    const { classes } = this.props;
    const { username, error } = this.state;
    return (
      <main className={this.props.classes.main} >
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in to Northcoders Knews!
        </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input id="username" value={username} name="username" autoComplete="username" autoFocus onChange={this.handleChange} />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleSubmit}
            >
              Sign in
          </Button>
          </form>
          <Typography id="error" paragraph>
            {error && `Can't find that username. How about jessjelly?`}
          </Typography>
        </Paper>
      </main>
    )
  }
}

export default withStyles(styles)(LoginForm);