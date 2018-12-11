import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {replace} from 'connected-react-router';
import {Redirect} from 'react-router-dom';

import api from '../jsonapi';
import ACTION from '../actions';


function Button(props){
  if (props.isLogging){
    return(
      <button class="btn loading" onClick={undefined}>
      </button>
    );
  }

  return ( 
    <button class="btn" type="submit">
      Sign in
    </button>
  );
}
Button.propTypes = {
  isLoggin: PropTypes.bool.isRequired,
};

class SignIn extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLogging: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  async handleLogin(event, self) {
    event.preventDefault();
    let formdata = new FormData(document.getElementById('signin-form')); 
    let logindata = {
      account: formdata.get('account'),
      password: formdata.get('password'),
    }; 
    try {
      let res = await api.post('/usr/login', logindata);
      if(res['msg'] == 'passed'){
        self.props.login(res["sessionId"]);
      } else{
        throw new Error("Login failed");
      }
    } catch(e){
      console.log(e);
      alert("Login failed.")
    }
    self.setState({
      isLogging: false, 
    });
  }

  render(){
    if (this.props.isLoggedIn){
      return (<Redirect to="/dashboard/" />);
    }

    return (
      <div>
        <h1 class="text-center">
          Sign in
        </h1>
        <div class="container grid-sm">
          <form 
            class="column col-6 col-sm-12 col-mx-auto"
            id="signin-form"
            onSubmit={(e)=>this.handleLogin(e, this)}   
          >
            <div class="form-group">
              <div class="form-label" for="account">Username</div>
              <input class="form-input" type="text" name="account" placeholder="Username" />
            </div>
            <div class="form-group">
              <div class="form-label" for="password">Password</div>
              <input class="form-input" type="password" name="password" placeholder="password" />
            </div>
            <div class="text-right">
              <Button isLogging={this.state.isLogging} />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

let stateMap = (state) => {
  return {
    isLoggedIn: state.signin.isLoggedIn,
  };
};

let dispatchMap = (dispatch) => bindActionCreators(
  {
    login: (token)=>(
      (dispatch) => {
        dispatch(ACTION.login(token));
        dispatch(replace('/dashboard/'));
        localStorage.setItem('sessionId', token);
      }
    ),
  },
  dispatch
);

SignIn = connect(stateMap, dispatchMap)(SignIn);
export default SignIn;
