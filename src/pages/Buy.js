import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {
  Avatar, 
  Grid, 
  Card, 
  CardHeader, 
  CardContent, 
  Typography,
  Button,
  CardActions
} from '@material-ui/core';

import {Power} from '@material-ui/icons';

import {ButtonAppBar} from '../components';

const styles = (theme) => ({
  mainGrid:{
    marginTop: 100, 
  },
});

let waitList = [
  {value: 10, name: "Alice"},
  {value: 20, name: "Bob"},
];

function Buy(props){
  const { classes } = props;

  return (
    <React.Fragment>
    <ButtonAppBar title="Buy" /> 
    <Grid container spacing={16} direction="column" className={classes.mainGrid}>
      {waitList.map(tx => (
        <Grid item key={JSON.stringify(tx)}> 
          <Card>      
            <CardHeader 
              title={tx.value + ' kWh'} 
              avatar={
                <Avatar>
                  <Power />
                </Avatar>
              }
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2" color="textSecondary">
                {'Power from ' + tx.name}
              </Typography> 
            </CardContent>
            <CardActions>
              <Button color="primary">
                Buy
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}     
    </Grid>
    </React.Fragment>
  );
}

export default withStyles(styles)(Buy);
