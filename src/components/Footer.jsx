import React from 'react';

const Footer = () => {

  const thisYear = new Date().getFullYear()
  return (
    <div className="footer">
      © {thisYear} John O'Meara
    </div>
  );
};

export default Footer;