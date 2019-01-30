import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

import { AppBar, Button, CssBaseline, Divider, Drawer, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, withStyles, Tooltip } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';



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
    backgroundColor: theme.primary,

  },
  menuButton: {
    marginRight: 20,
  },

  iconButton: {
    marginRight: 10,
  },

  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  navLogo: {
    height: 50,
    width: 60,
  }
});

class Nav extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  componentDidMount() {
    this.props.fetchTopics();
  }

  render() {
    const { classes, theme, logoutLocalUser, topics, user } = this.props;

    const drawer = (
      <>
        <div className={classes.toolbar} />
        <List >
          {topics.map(({ slug }) => (
            <ListItem button key={slug} component={Link} to={`/topics/${slug}`} style={{ textDecoration: 'none', backgroundColor: '#fff' }} onClick={() => this.handleDrawerToggle()}>
              <ListItemText primary={slug} />
            </ListItem>
          ))}
          <Divider />
          <Link to='/topic/add' style={{ textDecoration: 'none' }}>
            <ListItem button style={{ backgroundColor: '#72BCD4' }} onClick={() => this.handleDrawerToggle()}>
              <ListItemIcon><AddIcon /></ListItemIcon>
              <ListItemText primary={<Typography variant="h6" style={{ color: '#fff' }}>New Topic</Typography>} />
            </ListItem>
          </Link>

        </List>
        <Divider />
      </>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar} style={{ backgroundColor: '#72BCD4' }}>
          <Toolbar>
            <IconButton
              color="secondary"
              variant="outlined"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Link to={'/'} style={{ padding: 1 }} onClick={() => this.handleDrawerToggle()}>
              <img className={classes.navLogo} src="https://northcoders.com/images/logos/learn_to_code_manchester_rw_original.png"
                alt="Northcoders logo"></img>
            </Link>
            <Tooltip title={`Logged in as ${user.username}`}>
              <Button type="submit" onClick={logoutLocalUser} variant="outlined" color="secondary" style={{ flex: 1, marginLeft: 60 }}>
                Log out
            </Button>
            </Tooltip>
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
  classes: PropTypes.object.isRequired,
  topics: PropTypes.array,
  logoutLocalUser: PropTypes.func,
  fetchTopics: PropTypes.func,
  user: PropTypes.object,
};

export default withStyles(styles, { withTheme: true })(Nav);
