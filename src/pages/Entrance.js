"use strict"
import React from 'react';

import PropTypes from 'prop-types';

import {PlainAppBar} from '../components'

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {replace} from 'connected-react-router';

class Entrance extends React.Component {

  render() {
    return (
      <div>
        <PlainAppBar />
        <div>
          <h1 class="text-center">Power Chain</h1>
          <h2 class="text-center">Power the Future</h2>
        </div>
      </div>
    )
  }
}

export default Entrance;
