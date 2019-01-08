import React from 'react';
import { Button, Toolbar, AppBar, Typography } from '@material-ui/core';
// import MenuIcon from '@material-ui/icons/Menu';

const Header = ({ user }) => {
  return (
    <div className="header">
      <AppBar position="static" style={{ justifyContent: "space-between" }} >
        <Toolbar >
          {/* <MenuIcon ></MenuIcon> */}
          <img className="header-logo" src="https://northcoders.com/images/logos/learn_to_code_manchester_rw_original.png"
            alt="Northcoders logo"></img>
          <Typography type="title" color="default" style={{ flex: 1 }}>
            {`You are logged in as ${user.username}`}
          </Typography>
          <div>
            <Button variant="outlined" color="secondary">
              Log out
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;