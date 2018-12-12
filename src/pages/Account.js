import React from 'react';
import PropTypes from 'prop-types';

import {ButtonAppBar} from '../components';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

class TxHistory extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const {tx} = this.props;

    return (
      <React.Fragment> 
        <div class="columns my-1">      
          <div class="col-6 pl-2"> 
            <span>{tx.value + ' kWh @ ￥' + tx.price}</span> 
          </div>
          <div class="col-4">
            <span class="">
              {(tx.typename=='sell') ? "To" : "From"}: {tx.name}
            </span> 
          </div>
          <div class="col-2">
            <button class="btn">Details</button>
          </div>
        </div>
      </React.Fragment>
    );
  }
};

TxHistory.propTypes = {
  tx: PropTypes.object.isRequired,
};

function processList(res){
  let list = [];
  for (let d in res.delivery){
    let tx = {
      status: d.status,
      time: d.timestampSell,
      value: d.value,
      amount: d.amount,
      type: d.type,
      user: d.to,
    };
    list.append(tx);
  }
  for(let d in res.purchase){
    let tx = {
      status: d.status,
      time: d.timestampBuy,
      value: d.value,
      amount: d.amount,
      type: d.type,
      user: d.from,
    };
    list.append(tx);
  }

  list.sort((a, b) => {
    if (a.time > b.time) return -1;
    if (a.time = b.time) return 0;
    if (a.time < b.time) return 1;
  });
  return list;
}

class Account extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      loading: true,
      txList: [],
      balance: "--",
      account: "--"
    };

    this.refresh = this.refresh.bind(this);
  }

  async refresh(){
    const url = "/usr/account/msgInfo/" + this.props.sessionID;
    try{
      let res = await api.get(url); 
    } catch(e) {
      return;
    }

    if(res && res["msg"] != "failed"){
      let list = processList(res);
      this.setState({
        loading: false,
        txList: list, 
        account: res,account,
        balance: res.balance,
      });
    }
  }

  componentDidMount(){
    refresh();
    this.autoRefresh = setInteval(()=>this.refresh(), 30000);
  }

  componentWillUnmount(){
    if(this.autoRefresh){
      clearInterval(this.autoRefresh);
    }
  }

  render(){
    const props = this.props;

    if (this.state.loading){
      return (<div class="loading loading-lg"></div>);
    }
    if (!props.isLoggedIn) {
      return (
        <Redirect to="/signin/" />         
      );
    }
    return (
      <div>
        <ButtonAppBar title="Account" noReturn={false} /> 
        <div class="container grid-sm">
          <div class="text-center">
            <h3>User</h3>
          </div>
          <div class="text-center">
            <h2><b>Balance:</b> {this.state.balance}</h2>
          </div>
          {this.state.txList.map(tx => (
            <TxHistory tx={tx} key={JSON.stringify(tx)} />
          ))}     
        </div>
      </div>
    );
  }
}

let stateMap = (state) => ({
  isLoggedIn: state.signin.isLoggedIn,
  sessionId: state.signin.sessionToken,
});

export default connect(stateMap)(Account);
