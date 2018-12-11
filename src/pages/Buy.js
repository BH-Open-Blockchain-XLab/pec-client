import React from 'react';
import PropTypes from 'prop-types';

import {ConfirmDialog, ButtonAppBar} from "../components";
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

let waitList = [
  {value: 10, name: "Alice"},
  {value: 20, name: "Bob"},
];

class TxCard extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const props = this.props;
    const {tx} = this.props;
    
    return (
      <div class="columns my-2"> 
        <div class="col-4 col-mx-auto text-center">      
          {tx.value + ' kWh'} 
        </div>
        <div class="col-6 col-mx-auto text-center">
          {'Power from ' + tx.name}
        </div> 
        <div class="col-2 col-mx-auto text-center">
          <button class="btn" onClick={()=>props.buy()}>
            Buy
          </button>
        </div>
      </div>
    );
  }
};


TxCard.propTypes = {
  tx: PropTypes.object.isRequired,
  buy: PropTypes.func.isRequired,
}


class Buy extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      dialogOpen: false,
      dialogAction: ()=>null,
    };
    this.handleBuy = this.handleBuy.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.submitPurchase = this.handleClose.bind(this);
  }

  handleBuy(tx){
    this.setState({
      dialogOpen: true,
      dialogAction: ()=>this.submitPurchase(tx),
    });
  }
  handleClose(){
    this.setState({
      dialogOpen: false,
    });
  }
  submitPurchase(tx){
    //async fetch
    this.handleClose();
  }

  render(){
    const props = this.props;

    if (!props.isLoggedIn) {
      return (
        <Redirect to="/signin/" />         
      );
    }
    return (
      <div>
        <ButtonAppBar title="Buy" noReturn={false} /> 
        <div class="container grid-sm">
          {waitList.map(tx => (
            <TxCard 
              tx={tx} 
              key={JSON.stringify(tx)} 
              buy={()=>this.handleBuy(tx)}
            />
          ))}     
        </div>
        <ConfirmDialog 
          title={"Are you sure?"}
          open={this.state.dialogOpen}
          yes={this.state.dialogAction}
          no={this.handleClose}
        />
      </div>
    );
  }
}

let stateMap = (state) => {return ({
  isLoggedIn: state.signin.isLoggedIn,
});};

export default connect(stateMap)(Buy);
