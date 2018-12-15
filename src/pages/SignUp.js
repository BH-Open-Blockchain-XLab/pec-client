import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {replace} from 'connected-react-router';
import {Redirect} from 'react-router-dom';

import api from '../jsonapi';
import ACTION from '../actions';
import {ButtonAppBar} from '../components';


function Button(props){
  if (props.isLogging){
    return(
      <button class="btn btn-link loading" onClick={undefined}>
      </button>
    );
  }

  return ( 
    <button class="btn" type="submit">
      Sign Up 
    </button>
  );
}
Button.propTypes = {
  isLoggin: PropTypes.bool.isRequired,
};

class SignUp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isSigning: false,
    };
    this.handleSignup = this.handleSignup.bind(this);
  }

  async handleSignup(event, self) {
    event.preventDefault();
    let formdata = new FormData(document.getElementById('signup-form')); 
    let signupdata = {
      account: formdata.get('account'),
      password: formdata.get('password'),
    }; 
    self.setState({
      isSigning: true, 
    });
    try {
      let res = await api.post('/usr/signup', signupdata);
      if(res['msg'] == 'succeed'){
        self.props.signup();
      } else{
        throw new Error("Signup failed");
      }
    } catch(e){
      this.setState({
        isSigning: false, 
      });
      alert("Signup failed.")
    }
  }

  render(){
    if (this.props.isLoggedIn){
      return (<Redirect to="/dashboard/" />);
    }

    return (
      <div>
        <ButtonAppBar noReturn={false} title="Sign Up" />
        <h1 class="text-center">
          Sign up
        </h1>
        <div class="container grid-sm">
          <form 
            class="column col-6 col-sm-12 col-mx-auto"
            id="signup-form"
            onSubmit={(e)=>this.handleSignup(e, this)}   
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
              <Button isSigning={this.state.isSigning} />
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
    signup: ()=>replace('/login/'),
  },
  dispatch
);

SignUp = connect(stateMap, dispatchMap)(SignUp);
export default SignUp;
