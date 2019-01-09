import React from 'react';
import { Router } from "@reach/router";
import CommentsSideBar from "./CommentsSideBar";

const SideBar = ({ user }) => {
  return (
    <>
      <Router>
        <CommentsSideBar path="/:topic/:article_id" user={user} />
      </Router>
    </>
  );
};

export default SideBar;