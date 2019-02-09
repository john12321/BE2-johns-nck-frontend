import React, { Component } from 'react';
import * as api from '../api';
import { Avatar, Input, InputLabel, Button, Typography, CssBaseline, FormControl, Paper, withStyles } from '@material-ui/core';
import { navigate } from '@reach/router';
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


class TopicPost extends Component {
  state = {
    slug: '',
    description: '',
    err: false,
  };



  handleChange = ({ target: { value, id } }) => {
    this.setState({ [id]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { slug, description } = this.state;
    api
      .postTopic(slug, description)
      .then(topic => {
        this.setState({ slug: "", description: "" });
        this.props.addNewTopic(topic);
        navigate('/');
      })
      .catch((error) => {
        this.setState({ err: true });
      });
  };

  render() {
    const { classes, user } = this.props;
    const { err, slug, description } = this.state;
    return (
      <main className={this.props.classes.main} >
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            {user.avatar}
          </Avatar>
          <Typography component="h1" variant="h5">
            Post a new topic
        </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor='slug'>Topic:</InputLabel>
              <Input type='text' id='slug' value={slug} required onChange={this.handleChange} />
              <FormControl>
                <InputLabel htmlFor='description'>Description:</InputLabel>
                <Input type='text' id='description' value={description} required onChange={this.handleChange} />
              </FormControl>
              <Button type='submit' variant="outlined" onSubmit={this.handleSubmit} >Post Topic</Button>
            </FormControl>
          </form>
          {err && (
            <Typography style={{ color: 'red' }}>
              Oops! Something went wrong. Does the topic already exist?
            </Typography>
          )}
        </Paper>
      </main>
    )
  }
};

TopicPost.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object,
  addNewTopic: PropTypes.func,
};


export default withStyles(styles)(TopicPost);
