
import React from 'react';
import PropTypes from 'prop-types';

import {ButtonAppBar, ConfirmDialog} from '../components';
import {Redirect} from 'react-router-dom';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {replace} from 'connected-react-router';

import api from "../jsonapi";

function DatetimePicker(props){ 
  return (
    <div class="form-group columns my-2">
      <div class="col-3 text-center">
        <label class="form-label">{props.title}</label>
      </div>
      <div class="col-9">
        <input class="form-input mb-1" type="date" name={props.id+"-date"} />
        <input class="form-input" type="time" name={props.id+"-time"} />
      </div>
    </div>
  );
}
DatetimePicker.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

function InputRow(props){
  return (
    <div class="from-group columns my-2">
      <div class="col-3 text-center">
        <label class="form-label">{props.title}</label>
      </div>
      <div class="col-9">
        <input name={props.id} class="form-input" type={props.type} />
      </div>
    </div>
  );
}
InputRow.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

function txToSell(formdata, sessionId){
  let data = {
    sessionId,
    msg: "delivery",
    timestampSell: Date.now(),
    tx: [{
        value: formdata.get("price"),
        amount: formdata.get("value"),
        type: "wind",
        inputData: "none",
      }
    ],
  }

  return data;
}


class Sell extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      sending: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleSubmit(event){
    this.setState({ open: true });
    event.preventDefault();
  }

  async submit(){
    let formdata = new FormData(document.getElementById("sell-form"));
    this.setState({
      open: false,
      sending: true,
    });
  
    let data = txToSell(formdata, this.props.sessionId);
    let res;
    try {
      let res = await api.post("/tx/delivery/", data);
      this.setState({
        sending: false, 
      });
      if (!res || res.msg == "failed"){
        throw new Error("sell failed");
      } else{
        this.props.submit();
      }
    } catch(e) {
      alert("Failed to sell.");
    }
  }

  handleClose(){
    this.setState({ open: false });
  }

  render(){
    const props = this.props;

    if (!props.isLoggedIn) {
      return (
        <Redirect to="/signin/" />         
      );
    }
    return ( 
      <div>
        <ButtonAppBar title="Sell" noReturn={false} />
        <div class="text-center">
          <h1>Sell Eletricity</h1>
        </div>
        <div class="container grid-sm">
          <form class="form-horizonal" id="sell-form" onSubmit={this.handleSubmit}>
            <InputRow title="Value(kWh):" id="value" type="number" />
            <InputRow title="Price(￥):" id="price" type="number" />

            <div class="text-right"> 
              <button type="submit" class="btn btn-primary">Sell</button>
            </div>
          </form>
        </div>

        <ConfirmDialog
          yes={()=>this.submit()}
          no={()=>this.handleClose()}
          title={"Are you sure?"}
          open={this.state.open}
        />
      </div>
    );
  }
}

let dispatchMap = (dispatch) => bindActionCreators(
  {
    submit: ()=>replace('/dashboard/'),
  }, 
  dispatch
);
let stateMap = (state) => {return ({
  isLoggedIn: state.signin.isLoggedIn,
  sessionId: state.signin.sessionToken,
});};

Sell = connect(stateMap, dispatchMap)(Sell);
export default Sell;
