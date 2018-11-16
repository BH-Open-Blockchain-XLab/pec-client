import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';

import {withRouter} from 'react-router';

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

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          {(typeof props.noReturn === 'undefined') && 
            <IconButton 
              className={classes.menuButton} 
              color="inherit" 
              aria-label="Menu" 
              onClick={()=>{props.history.goBack();}}
            >
              <ArrowBack />
            </IconButton>
          }
          <Typography variant="h6" color="inherit" className={classes.grow}>
            {props.title}
          </Typography>
          <Button color="inherit" onClick={()=>{props.history.replace("/");}}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
 );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

ButtonAppBar = withRouter(withStyles(styles)(ButtonAppBar));
export default ButtonAppBar;
