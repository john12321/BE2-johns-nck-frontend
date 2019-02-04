import React from 'react';
import { Card, Typography } from '@material-ui/core';
import { Link } from '@reach/router';

const Errors = () => {
  return (
    <Card>
      <Typography>That page doesn't exist. Please click home link below and try again...</Typography>
      <Link to="/">Home</Link>
    </Card>
  );
};

export default Errors;