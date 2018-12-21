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
        <AppBar buttonLabel="LOGIN" action={()=>props.goToSignIn()} />
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

export default Entrance;
