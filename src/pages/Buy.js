import React from 'react';
import PropTypes from 'prop-types';

import {ConfirmDialog, ButtonAppBar} from "../components";
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import api from '../jsonapi';

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
          {'Price: ￥' + tx.value}
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
      txList: [],
    };
    this.handleBuy = this.handleBuy.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.submitPurchase = this.submitPurchase.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  handleBuy(tx){
    this.setState({
      dialogOpen: true,
      txToBuy: tx,
    });
  }
  handleClose(){
    this.setState({
      dialogOpen: false,
    });
  }
  async submitPurchase(){
    //async fetch
    let tx = this.state.txToBuy;
    try {
      let res = await api.put('/tx/purchase', {
        sessionId: this.props.sessionId,
        msg: "purchase",
        timestampBuy: Date.now(),
        tx: [{
          txHash: tx.txHash,
        }],
      });
      if (!res || res.msg == "failed"){
        throw new Error("purchase invalid");
      }
    } catch(e) {
      alert("Purchase failed");
    }
    this.handleClose();
    this.refresh();
  }

  async refresh(){
    let res;
    try{
      res = await api.get('/tx/pool/poolInfo/' + this.props.sessionId); 
    } catch(e){
      return;
    }
    this.setState({
      txList: res["tx"], 
    });
  }

  componentDidMount(){
    this.refresh();
    this.autoRefresh = setInterval(()=>this.refresh(), 6000);
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
          yes={() => this.submitPurchase()}
          no={() => this.handleClose()}
        />
      </div>
    );
  }
}

let stateMap = (state) => {return ({
  isLoggedIn: state.signin.isLoggedIn,
  sessionId: state.signin.sessionToken,
});};

export default connect(stateMap)(Buy);
