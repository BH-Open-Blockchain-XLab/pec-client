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

import {ButtonAppBar, ConfirmDialog} from '../components';

const styles = (theme) => ({
  mainGrid:{
    marginTop: 100, 
  },
});

let waitList = [
  {value: 10, name: "Alice"},
  {value: 20, name: "Bob"},
];

class Buy extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      dialog:{
        open: false,
      }
    };

    this.handleBuy = this.handleBuy.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.submitPUrchase = this.handleClose.bind(this);
  }

  handleBuy(tx){
    console.log("buy");
    this.setState({
      dialog: {
        open: true, 
        action: ()=>this.submitPurchase(tx),
      }
    });
  }
  handleClose(){
    this.setState({
      dialog: {
        open: false,
        action: ()=>null
      }
    });
  }

  submitPurchase(tx){
    //async fetch
    this.handleClose();
  }

  render(){
    let props = this.props;
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
                <Button color="primary" onClick={()=>(this.handleBuy(tx))}>
                  Buy
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}     
      </Grid>
      <ConfirmDialog 
        title={"Are you sure?"}
        open={this.state.dialog.open}
        yes={this.state.dialog.action}
        no={this.handleClose}
      />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Buy);
