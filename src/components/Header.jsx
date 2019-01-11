import React from 'react';
import { Button, Toolbar, AppBar, Typography } from '@material-ui/core';
// import MenuIcon from '@material-ui/icons/Menu';
import { Link } from '@reach/router';

const Header = ({ user, logoutLocalUser }) => {
  return (
    <div className="header">
      <AppBar position="static" style={{ justifyContent: "space-between", background: 'transparent', boxShadow: 'none' }} >
        <Toolbar >
          <Link to={'/'}>
            {/* <MenuIcon ></MenuIcon> */}
            <img className="header-logo" src="https://northcoders.com/images/logos/learn_to_code_manchester_rw_original.png"
              alt="Northcoders logo"></img>
          </Link>
          <Typography type="title" color="default" style={{ flex: 1 }}>
            {`Welcome, ${user.username}`}
          </Typography>
          <div>
            <Button type="submit" onClick={logoutLocalUser} variant="outlined" color="secondary">
              Log out
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;