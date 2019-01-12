import React from 'react';
import { Button, Toolbar, AppBar, Typography, Avatar } from '@material-ui/core';
// import MenuIcon from '@material-ui/icons/Menu';
import { Link } from '@reach/router';


const Header = ({ user, logoutLocalUser }) => {
  return (
    < div className="header" >
      <AppBar position="sticky" style={{ background: 'transparent' }} >
        <Toolbar >
          <Link to={'/'}>
            <img className="header-logo" src="https://northcoders.com/images/logos/learn_to_code_manchester_rw_original.png"
              alt="Northcoders logo"></img>
          </Link>
          <Button >
            <Link to='/topic/add' className="addBtn" style={{ textDecoration: 'none' }} >New topic </Link>
          </Button>{' '}
          <Button >
            <Link to='/article/add' className="addBtn" style={{ textDecoration: 'none' }}>New Article</Link>
          </Button>
          <Typography type="title" color="default" style={{ flex: 1, fontSize: 20 }}>
            {`Welcome, ${user.username}`}
          </Typography>
          <Avatar alt={user.name} src={user.avatar_url} />
          <Button type="submit" onClick={logoutLocalUser} variant="outlined" color="primary">
            Log out
            </Button>
        </Toolbar>
      </AppBar>
    </div >
  );
};

export default Header;