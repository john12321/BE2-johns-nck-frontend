import React, { Component } from 'react';
import * as api from '../api';
import { Avatar, Input, InputLabel, Button, Card, CardHeader, CardContent, Typography, CssBaseline, FormControl, FormControlLabel, Checkbox, Paper, withStyles, TextField, MenuItem, Select } from '@material-ui/core';
import { navigate } from '@reach/router';

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
  // textField: {
  //   marginLeft: theme.spacing.unit,
  //   marginRight: theme.spacing.unit,
  // },
});


class TopicPost extends Component {
  state = {
    topic: {},
    err: false
  };


  handleSubmit = event => {
    event.preventDefault();
    const slug = event.target.slug.value;
    const description = event.target.description.value;
    api.postTopic(slug, description)
      .then(topic => {
        this.setState(() => ({ topic, topicPosted: true }));
        // this.props.fetchTopics();
        navigate(`/topics/${topic.slug}`)
          .catch(() => {
            this.setState({ err: true })
          })
      });
  };

  render() {
    const { classes, user } = this.props;
    const { err } = this.state;
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
              <Input type='text' id='slug' required />
              <FormControl>
                <InputLabel htmlFor='description'>Description:</InputLabel>
                <Input type='text' id='description' required />
              </FormControl>
              <Button type='submit' variant="outlined" onSubmit={this.handleSubmit} >Post Topic</Button>
            </FormControl>
          </form>
          {err && (
            <section>
              <p>Oops! Something went wrong. Please try again.</p>
            </section>
          )}
        </Paper>
      </main>
    )
  }
}
export default withStyles(styles)(TopicPost);
