import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import {push} from 'connected-react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function PlainAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            PowerExChain
          </Typography>
          <Button 
            color="inherit"  
            onClick={()=>props.signIn()}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

PlainAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

let dispatchMap = (dispatch) => (bindActionCreators(
  {
    signIn: ()=>push("/signin/"), 
  }, 
  dispatch
));

PlainAppBar = connect(null, dispatchMap)(PlainAppBar);

export default withStyles(styles)(PlainAppBar);
