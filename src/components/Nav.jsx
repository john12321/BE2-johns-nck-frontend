import React from 'react';
import { Button } from '@material-ui/core';


const Nav = ({ topics }) => {
  return (
    <div className="nav">
      {topics.map(({ slug }) => {
        return <Button key={slug}>{slug}</Button>
      })}
    </div>
  );
}

export default Nav;
