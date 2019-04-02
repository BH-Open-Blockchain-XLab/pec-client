import React from 'react';
import PropTypes from 'prop-types';

import {AppBar, TabBar, TxTile} from '../components';
import {bindActionCreators} from 'redux';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import api from '../jsonapi';
import {logout} from '../thunks';

let Status = require("../status");

function AccountInfo(props) {
  let addr = props.account.address;
  return (
    <div class="p-20px m-20px">
      <div class="">
         <i class="fas fa-user"></i> <b>Account Information</b>
      </div>
      <div class="bg-white p-20px my-2">

        <div class="columns py-1">
           <div class="column col-12">Username: {props.account.account}</div>
        </div>

        <div class="columns py-1">
           <div class="column col-12">Balance: {props.account.balance}</div>
        </div>

		<div class="columns py-1">
		   <div class="column col-12">Address: {addr.substring(0, 10) + "......" + addr.substring(addr.length - 10, addr.length)}</div>
		</div>

      </div>
    </div>
  );
}
AccountInfo.propTypes = {
  account: PropTypes.object.isRequired,
};

class Account extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      loading: true,
      account: undefined,
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

    if(res && new Status(res.status).success){
      this.setState({
        loading: false,
		account: res
      });
    }
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
            <AccountInfo account={this.state.account} />

            <div class="p-20px m-20px">
              <div class="">
                 <i class="fas fa-cart-arrow-down"></i> <b>Purchases</b>
              </div>
              <div class="bg-white p-20px my-2">
                {this.state.account.purchase.map(
                  (tx) => (
                    <TxTile key={JSON.stringify(tx)} tx={tx} />
                  )
                )} 
              </div>
            </div>

            <div class="p-20px m-20px">
              <div class="">
                <i class="fas fa-truck"></i> <b>Delieveries</b>
              </div>
              <div class="bg-white p-20px my-2">
                {this.state.account.delivery.map(
                  (tx) => (
                    <TxTile key={JSON.stringify(tx)} tx={tx} />
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
