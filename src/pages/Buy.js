import React from 'react';
import PropTypes from 'prop-types';

import {ConfirmDialog, ButtonAppBar} from "../components";
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import api from '../jsonapi';

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
          {tx.amount + ' kWh'} 
        </div>
        <div class="col-6 col-mx-auto text-center">
          {'Power from ' + tx.from}
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
      txList: [],
    };
    this.handleBuy = this.handleBuy.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.submitPurchase = this.handleClose.bind(this);
    this.refresh = this.refresh.bind(this);
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

  async refresh(){
    let res;
    try{
      res = await api.get('/tx/pool/' + this.props.sessionToken); 
      console.log(res);
    } catch(e){
      console.log(e);
      return;
    }
    this.setState({
      txList: res["tx"], 
    });
  }

  componentDidMount(){
    this.refresh();
    this.autoRefresh = setInterval(()=>this.refresh(), 60000);
  }

  componentWillUnmount(){
    if(this.autoRefresh){
      clearInterval(this.autoRefresh);
    }
  }

  render(){
    const props = this.props;
    let txList = this.state.txList;

    if (!props.isLoggedIn) {
      return (
        <Redirect to="/signin/" />         
      );
    }
    return (
      <div>
        <ButtonAppBar title="Buy" noReturn={false} /> 
        <div class="container grid-sm">
          {txList.map(tx => (
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
  sessionToken: state.signin.sessionToken,
});};

export default connect(stateMap)(Buy);
