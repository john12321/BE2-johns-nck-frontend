import React, { Component } from 'react';
import * as api from '../api';
import { Avatar, Input, InputLabel, Button, Typography, CssBaseline, FormControl, Paper, withStyles, TextField, MenuItem, Select } from '@material-ui/core';
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
    marginTop: theme.spacing.unit * 4,
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


class ArticlePost extends Component {
  state = {
    // articlePosted: false,
    title: '',
    body: '',
    topic: '',
    err: false,
  };


  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { title, body, topic } = this.state;
    const user_id = this.props.user.user_id;
    api.postArticle(topic, { title, body, user_id }).then(article => {
      // this.setState(() => ({ articlePosted: true }));
      navigate(`/${article.topic}/articles`);
    }).catch(() => {
      this.setState({ err: true })
    })
  };


  render() {
    const { topics, classes, user } = this.props;
    const { title, body, topic, err } = this.state;

    return (
      <main className={this.props.classes.main} >
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            {user.avatar}
          </Avatar>
          <Typography component="h1" variant="h5">
            Post a new article
        </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="title">Article Title</InputLabel>
              <Input id="title" value={title} name="title" autoComplete="title" autoFocus onChange={this.handleChange} required />
            </FormControl>
            <TextField
              onChange={this.handleChange}
              required
              fullWidth
              value={body}
              name="body"
              id="outlined-required"
              label="Content"
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
            <InputLabel htmlFor="topic">Topic{' '}</InputLabel>
            <Select name="topic" id='topic' value={topic} onChange={this.handleChange} required>
              {topics.map(topic => {
                return (
                  <MenuItem key={topic.slug} value={topic.slug}>
                    {topic.slug}
                  </MenuItem>
                );
              })}
            </Select>
            <Button type='submit' variant="outlined" onSubmit={this.handleSubmit}>Post Article</Button>
          </form>
          {err && (
            <section>
              <p>Oops! Something went wrong. Please try again.</p>
            </section>
          )}

        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(ArticlePost);