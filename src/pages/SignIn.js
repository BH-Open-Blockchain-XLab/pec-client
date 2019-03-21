import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {replace} from 'connected-react-router';
import {Redirect, Link} from 'react-router-dom';

import api from '../jsonapi';
import ACTION from '../actions';

import {
  AppBar
} from "../components"

let Status = "../status";

function Button(props){
  if (props.isLoading){
    return(
      <div class="text-right">
         <button class="btn loading" type="submit" onClick={undefined}>Sign In</button>
      </div>
    );
  }

  return ( 
    <div class="text-right">
       <button class="btn" type="submit">Sign In</button>
    </div>
  );
}
Button.propTypes = {
  isLoading: PropTypes.bool.isRequired,
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
    self.setState({
      isLogging: true, 
    });
    try {
      let res = await api.post('/usr/login', logindata);
      if(res && new Status(res.status).success){
        self.props.login(res["sessionId"]);
      } else{
        throw new Error("Login failed");
      }
    } catch(e){
      this.setState({
        isLogging: false, 
      });
      alert("Login failed.")
    }
  }

  render(){
    if (this.props.isLoggedIn){
      return (<Redirect to="/account/" />);
    }

    return (
      <div>

        <AppBar noButton />

        <div class="container grid-sm">
          <div class="columns">
            <div class="column col-12 col-mx-auto mt-100px px-20px">
              <form class="card"
                    id="signin-form"
                    onSubmit={(e)=>this.handleLogin(e, this)}   
              >
                <div class="card-header h2">Sign In</div>
                <div class="card-body">
                  <input class="form-input mb-20px"
                         type="text"
                         name="account"
                         placeholder="Username"
                  />
                  <input class="form-input mb-20px"
                         type="password"
                         name="password"
                         placeholder="Password"
                  />
                  <div><Link to="/signup">Create a account</Link></div>
                  <Button isLoading={this.state.isLogging} />
                </div>
              </form>
            </div>
          </div> 
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
        dispatch(replace('/account/'));
        localStorage.setItem('sessionId', token);
      }
    ),
  },
  dispatch
);

SignIn = connect(stateMap, dispatchMap)(SignIn);
export default SignIn;
