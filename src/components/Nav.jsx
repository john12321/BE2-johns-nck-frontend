import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from '@reach/router';

const Nav = ({ topics }) => {
  return (
    <div className="nav">
      {topics.map(({ slug }) =>
        <Button key={slug}><Link to={`/topics/${slug}`}>{slug}</Link></Button>
      )}
    </div>
  );

}
export default Nav;


