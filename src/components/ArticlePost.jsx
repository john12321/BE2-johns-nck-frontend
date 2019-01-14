import React, { Component } from 'react';
import * as api from '../api';
import { Card, Button, CardContent } from '@material-ui/core';
import { navigate } from '@reach/router';

class ArticlePost extends Component {
  state = {
    articlePosted: false,
  };


  handleSubmit = event => {
    event.preventDefault();
    const title = event.target.title.value;
    const body = event.target.body.value;
    const user_id = this.props.user.user_id;
    const topic = event.target.topic.value;
    api.postArticle(topic, { title, body, user_id }).then(article => {
      this.setState(() => ({ articlePosted: true }));
      navigate(`/${article.topic}/${article.article_id}`);
    })
  };


  render() {
    const { topics } = this.props;
    const { articlePosted } = this.state;
    return (
      <Card className="post-form">
        <section>Post an Article</section>
        <CardContent>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor='title'>Title:</label>
              <input type='text' id='title' required />
            </div>
            <div>
              <label htmlFor='body'>Body:</label>
              <input type='text' id='body' required />
            </div>
            <div>
              <label htmlFor='topic'>Topic:</label>
              <select id='topic'>
                {topics.map(topic => {
                  return (
                    <option key={topic.slug} value={topic.slug}>
                      {topic.slug}
                    </option>
                  );
                })}
              </select>
            </div>
            <Button type='submit' variant="outlined" onSubmit={this.handleSubmit}>Post Article</Button>
          </form>
        </CardContent>
        {articlePosted && (
          <section>
            <h1>Posted!</h1>
          </section>
        )}

      </Card>
    );
  }
}

export default ArticlePost;