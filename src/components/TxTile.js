import React from "react";
import PropTypes from 'props-types';

function TileIcon(props) {
  let icon;

  if (props.type == 'wind') {
    icon = "fa-wind";
  } else if (props.types == 'water') {
    icon = "fa-water";
  } else if (props.types == 'solar') {
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
    // TODO: time and date
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
          {props.action}
        </div>
      </div>
    );
  }
}
TxTile.propTypes = {
  tx: PropType.object.isRequired,
  action: PropTypes.object.isRequried,
};

export default TxTile;
