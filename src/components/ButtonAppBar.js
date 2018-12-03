import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';

import {push, goBack, go} from 'connected-react-router';

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

class ButtonAppBar extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const props = this.props;
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
                onClick={()=>{props.goBack();}}
              >
                <ArrowBack />
              </IconButton>
            }
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {props.title}
            </Typography>
            <Button color="inherit" onClick={()=>{props.logout();}}>Logout</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
 }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

let dispatchMap = (dispatch) => (bindActionCreators(
  {
    goBack: () => goBack(),
    logout: () => {return (dispatch)=>{dispatch(push("/"));}},
  },
  dispatch
));

ButtonAppBar = connect(null, dispatchMap)(ButtonAppBar);
ButtonAppBar = withStyles(styles)(ButtonAppBar);
export default ButtonAppBar;
