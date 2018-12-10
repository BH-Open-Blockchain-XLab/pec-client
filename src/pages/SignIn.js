import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {replace} from 'connected-react-router';
import api from '../jsonapi';


class SignIn extends React.Component {
  constructor(props){
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
  }

  async handleLogin(event){
    event.preventDefault();

    let res = await api.post('/login', {
      username: '',
      password: '',
    });
    if(res.message == 'success'){
      this.props.login(res.token);
    } else{
      alert("Login failed");
    }
  }

  render(){
    return (
      <React.Fragment>
        <h1 class="text-center">
          Sign in
        </h1>
        <div class="container grid-sm">
          <form 
            class="column col-6 col-sm-12 col-mx-auto"
            onSubmit={this.handleLogin}   
          >
            <div class="form-group">
              <div class="form-label" for="username">Username</div>
              <input class="form-input" type="text" id="username" placeholder="Username" />
            </div>
            <div class="form-group">
              <div class="form-label" for="password">Password</div>
              <input class="form-input" type="text" id="password" placeholder="password" />
            </div>
            <div class="text-right">
              <button class="btn" type="submit">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

let dispatchMap = (dispatch) => bindActionCreators(
  {
    login: ()=>replace('/dashboard/'),
  },
  dispatch
);

SignIn = connect(null, dispatchMap)(SignIn);
export default SignIn;
