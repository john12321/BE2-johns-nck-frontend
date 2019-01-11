import React from 'react';
import { Router } from "@reach/router";
import CommentsSideBar from "./CommentsSideBar";
import TopicsSideBar from './TopicsSideBar';
import ArticleSideBar from './ArticleSideBar';

const SideBar = ({ user, topics, fetchTopics }) => {
  return (
    <>
      <Router>
        <CommentsSideBar path="/:topic/:article_id" user={user} />
        <TopicsSideBar path="/" user={user} topics={topics} fetchTopics={fetchTopics} />
        <ArticleSideBar path="/topics/:topic" user={user} topics={topics} />
      </Router>
    </>
  );
};

export default SideBar;