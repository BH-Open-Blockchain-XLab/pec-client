import React from 'react';
import PropTypes from 'prop-types';

import {push, goBack, go} from 'connected-react-router';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import api from "../jsonapi";

import ACTION from '../actions';

class ButtonAppBar extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const props = this.props;
    return (
      <div class="navbar m-2 bg-gray">
        <div class="navbar-section">
          {(props.noReturn == false) && 
            <button 
              class="btn btn-primary"
              onClick={()=>{props.goBack();}}
            >
              <i class="icon icon-arrow-left"></i>
            </button>
          }
          <div class="navbar-brand mx-2 text-primary">{props.title}</div> 
        </div>
        <div class="navbar-section">
            <button class="btn btn-primary" onClick={()=>{props.logout();}}>Logout</button>
        </div>
      </div>
    );
 }
}

ButtonAppBar.propTypes = {
  title: PropTypes.string.isRequired,
  noReturn: PropTypes.bool.isRequired, 
};

let dispatchMap = (dispatch) => (bindActionCreators(
  {
    goBack: () => goBack(),
    logout: () => (
      (dispatch)=>{
        let id = localStorage.getItem('sessionId');
        api.delete("/usr/logout", {
          sessionId: id,
          msg: "logout",
        });
        localStorage.removeItem('sessionId');
        dispatch(ACTION.logout());
        dispatch(push("/"));
    }),
  },
  dispatch
));

ButtonAppBar = connect(null, dispatchMap)(ButtonAppBar);
export default ButtonAppBar;
