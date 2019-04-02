import React from 'react';
import PropTypes from 'prop-types';

import {
  ConfirmDialog, 
  AppBar,
  TxTile,
  TabBar,
} from "../components";

import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { logout } from '../thunks.js';
import {bindActionCreators} from "redux";
import ACTION from "../actions";
const closeDialog = ACTION.closeDialog;

import api from '../jsonapi';

let Status = require("../status");

class Buy extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      dialogOpen: false,
      txList: [],
    };
    this.submitPurchase = this.submitPurchase.bind(this);
    this.refresh = this.refresh.bind(this);
  }


  async submitPurchase(tx){
    //async fetch
    try {
      let res = await api.put('/tx/purchase', {
        sessionId: this.props.sessionId,
        msg: "purchase",
        timestampBuy: Date.now(),
        tx: [{
          txHash: tx.txHash,
        }],
      });
      if (!res){
        throw new Error("Not responding.");
      } else {
	    let status = new Status(res.status);
	    if (!status.success){
	      throw new Error(status.info);
		}
	  }
    } catch(e) {
	  console.log(e);
      alert(e.message());
	  this.props.closeDialog();
    }
	this.props.closeDialog();
    this.refresh();
  }

  async refresh(){
    let res;
    try{
      res = await api.get('/tx/pool/' + this.props.sessionId); 
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
	// TODO: add selection
    return (
      <div>
        <AppBar buttonLabel="LOGOUT" action={()=>props.logout()} /> 
        
        <div class="c-appContainer pt-50px">
          <div class="panel mt-20px c-appMain">

            <TabBar active="Buy" />

            <div class="p-20px m-20px">
              <div class="bg-white p-20px my-2">
                {txList.map(tx => (
                  <TxTile tx={tx} key={JSON.stringify(tx)} action={()=>this.submitPurchase(tx)} />
                ))}     
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

let stateMap = (state) => {return ({
  isLoggedIn: state.signin.isLoggedIn,
  sessionId: state.signin.sessionToken,
});};

let dispatchMap = (dispatch) => bindActionCreators({
  logout: ()=>logout,
  closeDialog: ()=>closeDialog(),
}, dispatch)

export default connect(stateMap, dispatchMap)(Buy);
