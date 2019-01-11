import React from 'react';
import { Link } from '@reach/router';

const Errors = () => {
  return (
    <div>
      <section>That page doesn't exist. Please click home link below and try again...</section>
      <Link to="/">Home</Link>
    </div>
  );
};

export default Errors;