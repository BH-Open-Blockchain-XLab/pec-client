
import React from 'react';
import PropTypes from 'prop-types';

import {
  Avatar,
  Button,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Checkbox,
  Input,
  InputLabel,
  LockIcon, 
  Paper,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogActions
} from '@material-ui/core';

import withStyles from '@material-ui/core/styles/withStyles';

import {ButtonAppBar} from '../components';

import {withRouter} from 'react-router';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: 80,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  timeGrid: {
    marginTop: 10,
  }
});

class Sell extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
    };
  }

  handleClickOpen(){
    this.setState({ open: true });
  }

  handleClose(){
    this.setState({ open: false });
  }

  render(){
    const { classes } = this.props;
    const props = this.props;
    return ( 
      <React.Fragment>
        <CssBaseline />
        <ButtonAppBar title="Sell" />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
              Sell Eletricity
            </Typography>
            <form className={classes.form}>
  
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="value">Value</InputLabel>
                <Input id="value" 
                       name="value" 
                       autoFocus 
                       endAdornment={
                         <InputAdornment position="end">
                           kWh
                         </InputAdornment>
                       }
                />
              </FormControl>
  
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="price">Price</InputLabel>
                <Input id="price" 
                       name="price" 
                       autoFocus 
                       endAdornment={
                         <InputAdornment position="start">
                           ￥
                         </InputAdornment>
                       }
                />
              </FormControl>
  
              <Grid container item className={classes.timeGrid} spacing={32}>
                <Grid item>
                  <TextField
                    id="date"
                    label="Start at"
                    type="date"
                    defaultValue="2017-05-24"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="time"
                    label="Time"
                    type="time"
                    defaultValue="07:30"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                     step: 300, // 5 min
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container item className={classes.timeGrid} spacing={32}>
                <Grid item>
                  <TextField
                    id="date"
                    label="End in"
                    type="date"
                    defaultValue="2017-05-24"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
               />
               </Grid>
               <Grid item>
                 <TextField
                   id="time"
                   label="Time"
                   type="time"
                   defaultValue="07:30"
                   className={classes.textField}
                   InputLabelProps={{
                     shrink: true,
                   }}
                   inputProps={{
                    step: 300, // 5 min
                   }}
                 />
               </Grid>
              </Grid>
  
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={()=>{this.handleClickOpen();}}
              >
                Sell
              </Button>
            </form>
          </Paper>
        </main>
  
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
          >
            <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
            <DialogActions>
              <Button onClick={()=>{this.handleClose()}} color="primary">
                No
              </Button>
              <Button onClick={()=>{this.props.history.replace('/dashboard/')}} color="primary" autoFocus>
                Yes
              </Button>
            </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

Sell.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Sell));
