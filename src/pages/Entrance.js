"use strict" 
import React from 'react';

import PropTypes from 'prop-types';

import {AppBar} from '../components'

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {push} from 'connected-react-router';

class Entrance extends React.Component {

  componentDidMount() {
    document.body.className = "c-indexBody";
  }

  componentWillUnmount() {
    document.body.classname = "bg-secondary";
  }

  render() {
    const props = this.props;
    return (
      <div>
        <div class="c-bgdiv c-index"></div>
        <div class="columns m-2">
          <div class="column col-6 text-left">
            <h2 class="header-title col-6 text-light">PowExChain</h2>
          </div>
          <div class="column col-6 text-right mt-5px">
            <button class="btn btn-primary" onClick={()=>props.goToSignIn()}>LOGIN</button>
          </div>
        </div>

        <div class="container text-center mt-100px">
          <h1 class="text-light mt-50">Power the Future</h1>
        </div>
      </div>
    )
  }
}

const dispatchMap = dispatch => bindActionCreators({
    goToSignIn: ()=>push("/signin/"),
  },
  dispatch
);

export default connect(null, dispatchMap)(Entrance);
