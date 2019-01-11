import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from '@reach/router';

const Nav = ({ topics }) => {
  return (
    <div className="nav">
      <span>Topics</span>{' '}
      {topics.map(({ slug }) =>
        <Button variant="outlined" key={slug}><Link to={`/topics/${slug}`} style={{ textDecoration: 'none' }}>{slug}</Link></Button>
      )}
    </div>
  );

}
export default Nav;


