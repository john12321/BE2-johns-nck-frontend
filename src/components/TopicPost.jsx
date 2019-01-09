import React, { Component } from 'react';
import * as api from '../api';
import { Card, Button, CardHeader, CardContent, Typography, CardActionArea } from '@material-ui/core';

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
      <Card>
        <CardHeader>post a topic</CardHeader>
        <CardActionArea>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor='slug'>Slug:</label>
            <input type='text' id='slug' required />
            <label htmlFor='description'>Description:</label>
            <input type='text' id='description' required />
            <Button type='submit' variant="outlined" onSubmit={this.handleSubmit} >Post Topic</Button>
          </form>
        </CardActionArea>
      </Card>
    ) : (
        <>
          <Card>
            <CardHeader>Topic Posted</CardHeader>
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