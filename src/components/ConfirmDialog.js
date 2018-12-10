import React from 'react';
import PropTypes from 'prop-types';

class ConfirmDialog extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const props = this.props;
    return (
      <div class={"modal " + (props.open ? "active" : "")}>
        <a class="modal-overlay" onClick={()=>props.no()}></a>
        <div class="modal-container">
          <div class="modal-header">
            <div class="modal-title h5">{props.title}</div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" onClick={()=>props.yes()}>Yes</button>
            <button class="btn btn-link" onClick={()=>props.no()}>No</button>
          </div>
        </div>
      </div>
    );
  }
}

ConfirmDialog.propTypes = {
  yes: PropTypes.func.isRequired,
  no: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
}

export default ConfirmDialog;
