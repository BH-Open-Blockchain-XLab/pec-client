"use strict"
import React from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import {Paper, Grid, CardContent} from '@material-ui/core';

import {People, Info, Power} from '@material-ui/icons';


import {PlainAppBar} from '../components'

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
    <Paper className={classes.card}>
      {props.icon}
      <Typography gutterBottom variant="h5" component="h2">
        {props.value}
      </Typography>
    </Paper>
    </Grid>
  );
}

IndexCards = withStyles(cardStyles)(IndexCards);

class Entrance extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <PlainAppBar />
        <main>
          <div className={classes.heroUnit}>
            <div className={classes.heroContent}>
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                PowerExChain
              </Typography>
              <Typography variant="h6" align="center" color="textSecondary" paragraph>
                Power the Future.
              </Typography>
            </div>
          </div>

          <div className={classNames(classes.layout, classes.cardGrid)}>
            <Grid container spacing={40} justify='center'>
              <IndexCards icon={(<Power />)} value="PowerChain" />
              <IndexCards icon={(<People />)} value="Teams" />
              <IndexCards icon={(<Info />)} value="About" />
            </Grid>
          </div>
        </main>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Entrance);
