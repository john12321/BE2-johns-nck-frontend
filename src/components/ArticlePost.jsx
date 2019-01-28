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
});


class ArticlePost extends Component {
  state = {
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
    const { title, body, topic } = this.state;
    const { user } = this.props
    const user_id = user.user_id;
    event.preventDefault();
    console.log(title, body, user_id, topic)
    api.postArticle({ title, body, user_id }, topic).then(article => {
      console.log(article)
      this.setState({ title: '', body: '' });
      navigate(`/${article.topic}/${article.article_id}`);
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
          <Avatar className={classes.avatar} style={{ height: 40, width: 40, color: '#72BCD4' }}>
            {user.name}
          </Avatar>
          <Typography component="h1" variant="h5">
            Post a new article
        </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="title">Article Title</InputLabel>
              <Input
                id="title"
                value={title || ''}
                name="title"
                autoComplete="title"
                autoFocus
                onChange={this.handleChange}
                required
              />
            </FormControl>
            <TextField
              onChange={this.handleChange}
              required
              fullWidth
              value={body || ''}
              name="body"
              id="outlined-required"
              label="Content"
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
            <InputLabel htmlFor="topic">Topic{' '}</InputLabel>
            <Select name="topic" id='topic' value={topic} onChange={this.handleChange} >
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