import React from 'react';
import PropTypes from 'prop-types';

import {push} from 'connected-react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class PlainAppBar extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div class="navbar m-2 bg-gray">
        <div class="navbar-section">
          <h3 class="navbar-brand mx-2 text-primary">PowerChain</h3> 
        </div>
        <div class="navbar-section">
          <button 
            class="btn btn-primary"
            onClick={()=>this.props.signIn()}
          >
            LOGIN
          </button>
        </div>
      </div>
    );
  }
}

let dispatchMap = (dispatch) => bindActionCreators(
  {
    signIn: ()=>push("/signin/"), 
  }, 
  dispatch
);

PlainAppBar = connect(null, dispatchMap)(PlainAppBar);
export default PlainAppBar;
