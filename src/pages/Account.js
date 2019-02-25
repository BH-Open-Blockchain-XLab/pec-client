import React from 'react';
import PropTypes from 'prop-types';

import {AppBar, TabBar, TxTile} from '../components';
import {bindActionCreators} from 'redux';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import api from '../jsonapi';
import {logout} from '../thunks';

function AccountInfo(props) {
  return (
    <div class="p-20px m-20px">
      <div class="">
         <i class="fas fa-user"></i> <b>Account Information</b>
      </div>
      <div class="bg-white p-20px my-2">
        <div class="columns py-1">
           <div class="column col-5">Username:</div>
           <div class="column col-7">{props.username}</div>
        </div>
        <div class="columns py-1">
           <div class="column col-5">Balance:</div>
           <div class="column col-7">{props.balance}</div>
        </div>
      </div>
    </div>
  );
}
AccountInfo.propTypes = {
  username: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
};

function PurchaseDetails(props) {
  return (
    <button class="btn btn-link">
      <i class="fas fa-caret-down"></i>
    </button>
  );
}

function DeliveryDetails(props) {
  return (
    <button class="btn btn-link">
      <i class="fas fa-caret-down"></i>
    </button>
  );
}

class Account extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      loading: true,
      delivery: [],
      purchase: [],
      balance: "--",
      account: "--",
    };

    this.refresh = this.refresh.bind(this);
  }

  async refresh(){
    const url = "/usr/account/" + this.props.sessionId;
    let res;
    try{
      res = await api.get(url); 
    } catch(e) {
      return;
    }

    if(res && res["msg"] != "failed"){
      this.setState({
        loading: false,
        purchase: res.purchase, 
        delivery: res.delivery,
        account: res.account,
        balance: res.balance,
      });
    }
    console.log(res);
  }

  componentDidMount(){
    this.refresh();
    this.autoRefresh = setInterval(()=>this.refresh(), 30000);
  }

  componentWillUnmount(){
    if(this.autoRefresh){
      clearInterval(this.autoRefresh);
    }
  }

  render(){
    const props = this.props;
    if (!props.isLoggedIn) {
      return (
        <Redirect to="/signin/" />         
      );
    }
    if (this.state.loading){
      return (
        <div>
          <AppBar buttonLabel="LOGOUT" action={()=>props.logout()} /> 
          <div class="c-appContainer pt-50px">
            <div class="panel mt-20px c-appMain">
              <TabBar active="Account" />
              <div class="loading loading-lg mt-50px"></div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <AppBar buttonLabel="LOGOUT" action={()=>props.logout()} /> 
        <div class="c-appContainer pt-50px">
          <div class="panel mt-20px c-appMain">
            <TabBar active="Account" />
            <AccountInfo username={this.state.account} balance={this.state.balance} />

            <div class="p-20px m-20px">
              <div class="">
                 <i class="fas fa-cart-arrow-down"></i> <b>Purchases</b>
              </div>
              <div class="bg-white p-20px my-2">
                {this.state.purchase.map(
                  (tx) => (
                    <TxTile key={JSON.stringify(tx)} tx={tx} action={(
                      <PurchaseDetails /> 
                    )} />
                  )
                )} 
              </div>
            </div>

            <div class="p-20px m-20px">
              <div class="">
                <i class="fas fa-truck"></i> <b>Delieveries</b>
              </div>
              <div class="bg-white p-20px my-2">
                {this.state.delivery.map(
                  (tx) => (
                    <TxTile key={JSON.stringify(tx)} tx={tx}>
                      <DeliveryDetails /> 
                    </TxTile>
                  )
                )} 
              </div>
            </div>

          </div>


        </div>
      </div>
    );
  }
}

let stateMap = (state) => ({
  isLoggedIn: state.signin.isLoggedIn,
  sessionId: state.signin.sessionToken,
});

let dispatchMap = (dispatch) => bindActionCreators({
    logout: ()=>logout,
  },
  dispatch
);

export default connect(stateMap, dispatchMap)(Account);
