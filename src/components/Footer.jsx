import React from 'react';
import Filters from './Filters';
import PagesNav from './PagesNav';

const Footer = () => {
  return (
    <div className="footer">
      {/* todo - sticky footer */}
      <PagesNav />
      <Filters />
    </div>
  );
};

export default Footer;