import React, { Component } from 'react';
import * as api from '../api';
import { Card, Button, CardContent, Typography } from '@material-ui/core';

class TopicPost extends Component {
  state = {
    topic: {},
    topicPosted: false,
  };

  handleSubmit = event => {
    event.preventDefault();
    const slug = event.target.slug.value;
    const description = event.target.description.value;
    api.postTopic(slug, description).then(topic => {
      this.setState(() => ({ topic, topicPosted: true }));
    });
  };

  render() {
    const { topic, topicPosted } = this.state;
    return !topicPosted ? (
      <>
        <br />
        <Card>
          <section>post a new topic</section>
          <CardContent>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor='slug'>Slug:</label>
              <input type='text' id='slug' required />
              <label htmlFor='description'>Description:</label>
              <input type='text' id='description' required />
              <Button type='submit' variant="outlined" onSubmit={this.handleSubmit} >Post Topic</Button>
            </form>
          </CardContent>
        </Card>
      </>
    ) : (
        <>
          <br />
          <Card>
            <section>Your topic has been posted!</section>
            <CardContent>
              <Typography>{topic.slug}</Typography>
              <Typography>{topic.description}</Typography>
            </CardContent>
          </Card>
        </>
      );
  }
}

export default TopicPost;