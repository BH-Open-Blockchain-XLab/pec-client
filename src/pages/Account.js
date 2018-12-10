import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {ArrowBack, ArrowForward} from '@material-ui/icons';

import {ButtonAppBar} from '../components';

let txList = [
  {typename:'sell', value: 10, name: "Alice", price: 10},
  {typename: 'buy', value: 20, name: "Bob", price: 19},
];

function getAvatar(typename){
  if(typename == 'sell'){
    return (
      <Avatar>
        <ArrowBack />
      </Avatar>
    );
  } else if(typename == 'buy'){
    return (
      <Avatar>
        <ArrowForward />
      </Avatar>
    );
  }
}

function Account(props){
  const { classes } = props;

  return (
    <React.Fragment>
    <ButtonAppBar title="Account" /> 
    <Grid container spacing={16} direction="column" className={classes.mainGrid}>
      <Grid item>
        <Typography gutterBottom variant="h5" component="h2" align="center">
          User
        </Typography> 
        <Typography gutterBottom variant="h5" component="h2" align="center">
          Balance: 10 
        </Typography> 
        <Typography gutterBottom variant="h5" component="h2" align="center"> 
          Electricity: 10 kWh
        </Typography> 
      </Grid>
      {txList.map(tx => (
        <Grid item key={JSON.stringify(tx)}> 
          <Card>      
            <CardHeader 
              title={tx.value + ' kWh @ ￥' + tx.price} 
              avatar={getAvatar(tx.typename)}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2" color="textSecondary">
                {(tx.typename=='sell') ? "To" : "From"} {tx.name}
              </Typography> 
            </CardContent>
            <CardActions>
              <Button color="primary">
                Details
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}     
    </Grid>
    </React.Fragment>
  );
}

export default withStyles(styles)(Account);
