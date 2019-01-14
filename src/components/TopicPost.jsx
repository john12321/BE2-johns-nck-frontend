import React, { Component } from 'react';
import * as api from '../api';
import { Card, Button, CardContent } from '@material-ui/core';
import { navigate } from '@reach/router';

class TopicPost extends Component {
  state = {
    topic: {},
    // topicPosted: false,
    err: false
  };


  handleSubmit = event => {
    event.preventDefault();
    const slug = event.target.slug.value;
    const description = event.target.description.value;
    api.postTopic(slug, description)
      .then(topic => {
        console.log(topic)
        this.setState(() => ({ topic, topicPosted: true }));
        // this.props.fetchTopics();
        navigate(`/topics/${topic.slug}`)
          .catch(() => {
            this.setState({ err: true })
          })
      });
  };

  render() {
    const { topicPosted } = this.state;
    return !topicPosted ? (
      <>
        <Card className="post-form">
          <section>post a new topic</section>
          <CardContent>
            <form onSubmit={this.handleSubmit}>
              <div>
                <label htmlFor='slug'>Topic:</label>
                <input type='text' id='slug' required />
              </div>
              <div>
                <label htmlFor='description'>Description:</label>
                <input type='text' id='description' required />
              </div>
              <Button type='submit' variant="outlined" onSubmit={this.handleSubmit} >Post Topic</Button>
            </form>
          </CardContent>
        </Card>
      </>
    ) : (
        <>
          {/* <br />
          <Card>
            <section>Your topic has been posted!</section>
            <CardContent>
              <Typography>{topic.slug}</Typography>
              <Typography>{topic.description}</Typography>
            </CardContent>
          </Card> */}
        </>
      );
  }
}

export default TopicPost;