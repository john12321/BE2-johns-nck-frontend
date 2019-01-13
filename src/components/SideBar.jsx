import React from 'react';
import { Router } from "@reach/router";
import ArticlePost from './ArticlePost';
import TopicPost from './TopicPost';

const SideBar = ({ user, topics, fetchTopics, addNewTopic }) => {
  return (
    <>
      <Router className="sidebar">
        <TopicPost className="topicPost" path="/topic/add" user={user} topics={topics} fetchTopics={fetchTopics} addNewTopic={addNewTopic} />
        <ArticlePost user={user} topics={topics} path="/article/add" />
      </Router>
    </>
  );
};

export default SideBar;