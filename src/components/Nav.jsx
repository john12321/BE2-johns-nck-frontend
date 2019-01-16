import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

import { AppBar, Button, CssBaseline, Divider, Drawer, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, withStyles, Collapse } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import ListSubheader from '@material-ui/core/ListSubheader';


const drawerWidth = 200;

const styles = theme => ({
  root: {
    display: 'flex',
    // backgroundColor: theme.palette.background.paper,

  },
  drawer: {
    width: drawerWidth,

  },
  appBar: {
    marginLeft: 0,
    width: '100%',
    zIndex: '2000',

  },
  menuButton: {
    marginRight: 20,
  },

  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

class Nav extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, theme, user, logoutLocalUser } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <List>
          {this.props.topics.map(({ slug }) => (
            <ListItem button key={slug} component={Link} to={`/topics/${slug}`} style={{ textDecoration: 'none' }} onClick={() => this.handleDrawerToggle()}>
              <ListItemText primary={slug} />
            </ListItem>
          ))}
          {['New Topic', 'New Article'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index < 2 ? <AddIcon /> : <AddIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}

        </List>
        <Divider />
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar} style={{ justifyContent: 'space-between', backgroundColor: '#aecfe4' }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Link to={'/'}>
              <img className="header-logo" src="https://northcoders.com/images/logos/learn_to_code_manchester_rw_original.png"
                alt="Northcoders logo"></img>
            </Link>
            <Button type="submit" onClick={logoutLocalUser} variant="outlined" color="secondary">
              Log out
            </Button>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      </div>
    );
  }
}

Nav.propTypes = {

};

export default withStyles(styles, { withTheme: true })(Nav);
