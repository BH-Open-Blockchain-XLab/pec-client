import React from 'react';
import PropTypes from 'prop-types';

import {ButtonAppBar} from '../components';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

let txList = [
  {typename:'sell', value: 10, name: "Alice", price: 10},
  {typename: 'buy', value: 20, name: "Bob", price: 19},
];

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


function Account(props){
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
          <h2><b>Balance:</b> 10</h2>
        </div>
        <div class="text-center">
          <h2><b>Electricity:</b> 10 KWh</h2>
        </div>
        {txList.map(tx => (
          <TxHistory tx={tx} key={JSON.stringify(tx)} />
        ))}     
      </div>
    </div>
  );
}

let stateMap = (state) => {return ({
  isLoggedIn: state.signin.isLoggedIn,
});};

export default connect(stateMap)(Account);
