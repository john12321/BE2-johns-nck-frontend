import React from 'react';
import { Router } from "@reach/router";
import CommentsSideBar from "./CommentsSideBar";
import TopicsSideBar from './TopicsSideBar';
import ArticleSideBar from './ArticleSideBar';

const SideBar = ({ user, topics }) => {
  return (
    <>
      <Router>
        <CommentsSideBar path="/:topic/:article_id" user={user} />
        <TopicsSideBar path="/topics/:topic" user={user} topics={topics} />
        <ArticleSideBar path="/" user={user} topics={topics} />
      </Router>
    </>
  );
};

export default SideBar;