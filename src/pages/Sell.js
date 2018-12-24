import React from 'react';
import PropTypes from 'prop-types';

import {
  AppBar, 
  ConfirmDialog,
} from '../components';

import {Redirect} from 'react-router-dom';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {replace} from 'connected-react-router';

import api from "../jsonapi";


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
        <input class="form-input" type={props.type} id={props.id} placeholder={props.title} />
      </div>
    </div>
  ;
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
        type: formdata.get("type").toLowerCase(),
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
        <AppBar title="Sell" action={props.logout()} />

        <div class="c-appContainer pt-50px">
          <div class="panel mt-20px c-appMain">
            <TabBar active="Sell" />
          </div>
          
        
          <div class="p-20px m-20px">
              <form class="card"
                    id="sell-form"
                    onSubmit={()=>this.handleSubmit()}   
              >

                <div class="card-header h2">Sell Electricity</div>

                <div class="card-body form-horizontal">

                  <InputRow title="Value(kWh):" id="value" type="number" />

                  <InputRow title="Price(￥):" id="price" type="number" />

                  <div class="form-group">
                    <div class="col-3 col-sm-12">
                      <label class="form-label" for="type">Type:</label>
                    </div>
                    <div class="col-9 col-sm-12">
                      <select class="form-select" id="type">
                        <option>Wind</option>
                        <option>Solar</option>
                        <option>Water</option>
                      </select>
                    </div>
                  </div>
                </div>

                <Button isLoading={false} />

                </div>
              </form>
          </div>
        </div>




        <div class="text-center">
          <h1>Sell Eletricity</h1>
        </div>
        <div class="container grid-sm">
          <form class="form-horizonal" id="sell-form" onSubmit={this.handleSubmit}>

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
    logout,
  }, 
  dispatch
);
let stateMap = (state) => {return ({
  isLoggedIn: state.signin.isLoggedIn,
  sessionId: state.signin.sessionToken,
});};

Sell = connect(stateMap, dispatchMap)(Sell);
export default Sell;

