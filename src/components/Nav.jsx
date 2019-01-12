import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { Link } from '@reach/router';

const Nav = ({ topics }) => {
  return (
    <>
      <Grid container justify="center" alignItems="center"
        space-around="2" className="nav">
        <span>Topics</span>{' '}
        {topics.map(({ slug }) =>
          <Button variant="outlined" key={slug}><Link to={`/topics/${slug}`} style={{ textDecoration: 'none' }}>{slug}</Link></Button>
        )}
      </Grid>
    </>
  );

}
export default Nav;


