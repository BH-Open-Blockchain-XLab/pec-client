import React from 'react';
import PropTypes from 'prop-types';

import {closeDialog} from '../actions';
import {connect} from 'react-redux';

class Dialog extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const props = this.props;
    return (
      <div class={"modal " + (props.show ? "active" : "")}>
        <a class="modal-overlay" onClick={()=>props.close()}></a>
        <div class="modal-container">
          <div class="modal-header">
            <div class="modal-title h5">{props.info}</div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" onClick={()=>props.close()}>OK</button>
          </div>
        </div>
      </div>
    );
  }
}

let stateMap = (state) => ({
  show: state.dialog.confirmDialog,
  info: state.dialog.info,
  action: state.dialog.dialogAction,
});

let diapatchMap = () => bindActionCreators({
    close: () => closeDialog(),
  },
  dispatch
});

export default connect(stateMap, dispatchMap)(InfoDialog);
