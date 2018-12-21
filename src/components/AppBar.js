import React from 'react';
import PropTypes from 'prop-types';

class AppBar extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const props = this.props;
    return (
      <div class="columns py-2 bg-gray p-fixed fixed-fullwidth on-top align-center">
        <div class="column col-6 text-left pl-20px">
          <h2 class="my-1 col-6 text-primary">PowExChain</h2>
        </div>

        { props.noButton == undefined && (
        <div class="column col-6 text-right pr-20px">
          <button class="btn btn-primary" onClick={()=>props.action()}>{props.buttonLabel}</button>
        </div>)}

      </div>
    )
 }
}

ButtonAppBar.propTypes = {
  action: PropTypes.func,
  buttonLabel: PropTypes.string,
};

export default AppBar;
