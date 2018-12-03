"use strict"

import React from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import {
  Paper, 
  Grid, 
  CardContent, 
  Avatar,
  Typography
} from '@material-ui/core';

import {ArrowUpward, ArrowDownward, AccountBalanceWallet} from '@material-ui/icons';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {push} from 'connected-react-router';

import {ButtonAppBar} from '../components';


const styles = (theme) => ({
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  layout: {
    width: 'auto',
    marginTop: 100,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
});

const cardStyles = {
  card:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20
  }
}

function IndexCards(props){
  const { classes } = props;
  return (
    <Grid item xs={12} md={4}>
    <div onClick={()=>props.enter(props.to)}>
    <Paper className={classes.card}>
      {props.icon}
      <Typography gutterBottom variant="h5" component="h2">
          {props.value}
      </Typography>
    </Paper>
    </div>
    </Grid>
  );
}

let dispatchMap = (dispatch) => bindActionCreators(
  {
    enter: (to)=>push(to),
  },
  dispatch
);

IndexCards = connect(null, dispatchMap)(IndexCards);
IndexCards = withStyles(cardStyles)(IndexCards);

class Dashboard extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <ButtonAppBar title="Dashboard" noReturn />
        <main>
          <div className={classNames(classes.layout, classes.cardGrid)}>
            <Grid container spacing={40} justify='center'>
              <IndexCards icon={(<AccountBalanceWallet />)} value="Account" to="/account/"/>
              <IndexCards icon={(<ArrowDownward />)} value="Buy" to="/buy/" />
              <IndexCards icon={(<ArrowUpward />)} value="Sell" to="/sell/" />
            </Grid>
          </div>
        </main>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Dashboard);
