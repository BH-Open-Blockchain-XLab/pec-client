"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {push} from 'connected-react-router';

import {ButtonAppBar} from '../components';

function IndexCard(props){
  return (
    <div class="column col-mx-auto col-12 text-center my-2">
    <div class="btn-group btn-group-block">
      <button 
        onClick={()=>props.enter(props.to)}
        class="btn"
      >
        {props.value}
      </button>
    </div>
    </div>
  );
}

let dispatchMap = (dispatch) => bindActionCreators(
  {
    enter: (to)=>push(to),
  },
  dispatch
);

IndexCard = connect(null, dispatchMap)(IndexCard);

class Dashboard extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <ButtonAppBar title="Dashboard" noReturn={true} />
        <div class="container grid-xs">
          <div class="columns">
            <IndexCard value="Account" to="/account/"/>
            <IndexCard value="Buy" to="/buy/" />
            <IndexCard value="Sell" to="/sell/" />
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard;
