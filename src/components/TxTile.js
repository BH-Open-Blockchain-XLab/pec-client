import React from "react";
import PropTypes from 'prop-types';

import ACTION from "../actions";
const confirmDialog = ACTION.confirmDialog;
const infoDialog = ACTION.infoDialog;
import {connect} from 'react-redux';

import {bindActionCreators} from "redux";

function TileIcon(props) {
  let icon;

  if (props.type == 'wind') {
    icon = "fa-wind";
  } else if (props.type == 'water') {
    icon = "fa-water";
  } else if (props.type == 'solar') {
    icon = "fa-sun"
  }

  return (
    <div class="tile-icon mr-2">
      <i class={"fas fa-2x " + icon}></i>
    </div>
  );
}
TileIcon.propsType = {
  type: PropTypes.string.isRequired,
}

class TxTile extends React.Component {
  constructor(props){
    super(props);
    let date = new Date(Number(props.tx.timestampSell));
	
    this.date = date.toLocaleString();
	
	this.showTx = this.showTx.bind(this);
  }

  showTx(){
    const tx = this.props.tx;
	let hash = tx.txHash;
    let infoString = "";
    infoString += "Tx Hash: " + hash.substring(0,10) + "......" + hash.substring(hash.length-10, hash.length) + "; ";
    infoString += "Block Height: " + tx.blockHeight + "; ";
	if (this.props.action){
	  this.props.showConfirm("Buy this?\n" + infoString, this.props.action);
	} else{
      this.props.show(infoString);
	}
  }

  render() { 
    const props = this.props;

    return (
      <div class="tile tile-centered">
        <TileIcon type={props.tx.type} />
        <div class="tile-content">
          <div class="tile-title">{props.tx.amount} KWh</div>
          <small class="tile-subtitle text-gray">￥{props.tx.value} · {this.date} · {this.time}</small>
        </div>
        <div class="tile-action">
          <button class="btn btn-link" onClick={()=>this.showTx()}>
            <i class="fas fa-caret-down"></i>
          </button>
        </div>
      </div>
    );
  }
}
TxTile.propTypes = {
  tx: PropTypes.object.isRequired,
};

const dispatchMap = (dispatch) => bindActionCreators({
    show: (infoString) => infoDialog(infoString), 
    showConfirm: (info, action) => confirmDialog(info, action),
  },
  dispatch
);

export default connect(null, dispatchMap)(TxTile);
