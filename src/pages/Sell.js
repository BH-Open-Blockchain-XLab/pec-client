import React from 'react';
import PropTypes from 'prop-types';

import {
  AppBar, 
  TabBar,
} from '../components';

import {Redirect} from 'react-router-dom';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {replace, push} from 'connected-react-router';

import api from "../jsonapi";
import {logout} from "../thunks";

import Status from "../status";

import ACTION from "../actions";
const confirmDialog = ACTION.confirmDialog;
import store from "../store";

function Button(props){
  if (props.isLoading){
    return(
      <div class="text-right">
         <button class="btn loading" type="submit" onClick={undefined}></button>
      </div>
    );
  }

  return ( 
    <div class="text-right">
       <button class="btn" type="submit">Sell</button>
    </div>
  );
}
Button.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};


function InputRow(props){
  return (
    <div class="form-group">
      <div class="col-3 col-sm-12">
        <label class="form-label" for={props.id}>{props.title}</label>
      </div>
      <div class="col-9 col-sm-12">
        <input class="form-input" type={props.type} name={props.id} placeholder={props.title} />
      </div>
    </div>
  );
}
InputRow.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

InputRow.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

function txToSell(formdata, sessionId){
  let date = Date.parse(formdata.get("expire-date") + "T" + formdata.get("expire-time") + ":00");
  let data = {
    sessionId,
    timestampSell: Date.now(),
    tx: [{
      timestampExpire: date,
      value: formdata.get("price"),
      amount: formdata.get("value"),
      type: formdata.get("type").toLowerCase(),
      inputData: "none", 
      power: formdata.get("power"),	
    }],
  }

  return data;
}


class Sell extends React.Component {
  constructor(props){
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleSubmit(event){
    this.props.submit(this.submit);
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
      if (!res){
        throw new Error("Not responding");
      } else if (!new Status(res.status).success){
		throw new Error(new Status(res.status).info); 
	  } else{
        this.props.redirect();
      }
    } catch(e) {
      alert(e.message());
    }
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
        <AppBar buttonLabel="LOGOUT" action={()=>props.logout()} /> 

        <div class="c-appContainer pt-50px">
          <div class="panel mt-20px c-appMain">
            <TabBar active="Sell" />
            <div class="p-20px m-20px">
                <form class="card"
                      id="sell-form"
                      onSubmit={(event)=>this.handleSubmit(event)}   
                >

                  <div class="card-header h2">Sell Electricity</div>

                  <div class="card-body form-horizontal">

                    <InputRow title="Value(kWh):" id="value" type="number" />
                    <InputRow title="Price(￥):" id="price" type="number" />
                    <InputRow title="Power(kW):" id="power" type="number" />
                    <InputRow title="Expire Date:" id="expire-date" type="date" />
                    <InputRow title="Expire Time:" id="expire-time" type="time" />

                    <div class="form-group">
                      <div class="col-3 col-sm-12">
                        <label class="form-label" for="type">Type:</label>
                      </div>
                      <div class="col-9 col-sm-12">
                        <select class="form-select" name="type">
                          <option>Wind</option>
                          <option>Solar</option>
                          <option>Water</option>
                        </select>
                      </div>
                    </div>
                    <Button isLoading={false} />
                  </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

let dispatchMap = (dispatch) => bindActionCreators(
  {
    submit: (action)=>confirmDialog("Are you sure?", action),
    redirect: ()=>replace('/account/'),
    logout: ()=>logout,
  }, 
  dispatch
);
let stateMap = (state) => {return ({
  isLoggedIn: state.signin.isLoggedIn,
  sessionId: state.signin.sessionToken,
});};

Sell = connect(stateMap, dispatchMap)(Sell);
export default Sell;

