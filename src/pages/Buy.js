import React from 'react';
import PropTypes from 'prop-types';

import {
  ConfirmDialog, 
  AppBar,
  TxTile,
} from "../components";

import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../thunks';

import api from '../jsonapi';

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
        <AppBar buttonLabel="LOGOUT" action={()=>props.logout()} /> 
        
        <div class="c-appContainer pt-50px">
          <div class="panel mt-20px c-appMain">
            <TabBar active="Buy" />
          </div>
          <div class="p-20px m-20px">
            <div class="bg-white p-20px my-2">
              {txList.map(tx => (
                <TxTile tx={tx} key={JSON.stringify(tx)} />
                  <button class="btn btn-primary" onClick={()=>this.handleBuy(tx)}>
                    Buy
                  </button>
                </TxTile>
              ))}     
            </div>
          </div>
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

let dispatchMap = (dispatch) => bindActionCreators({
  logout,
}, dispatch)

export default connect(stateMap, dispatchMap)(Buy);
