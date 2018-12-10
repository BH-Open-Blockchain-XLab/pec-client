import React from 'react';
import PropTypes from 'prop-types';

import {push, goBack, go} from 'connected-react-router';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class ButtonAppBar extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const props = this.props;
    return (
      <div class="navbar m-2 bg-gray">
        <div class="navbar-section">
          {(typeof props.noReturn == false) && 
            <button 
              class="btn btn-link"
              onClick={()=>{props.goBack();}}
            >
              <i class="icon icon-arrow-left"></i>
            </button>
          }
          <h3>{props.title}</h3>
        </div>
        <div class="navbar-section">
            <button class="inherit" onClick={()=>{props.logout();}}>Logout</Button>
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
    logout: () => {return (dispatch)=>{dispatch(push("/"));}},
  },
  dispatch
));

ButtonAppBar = connect(null, dispatchMap)(ButtonAppBar);
export default ButtonAppBar;
