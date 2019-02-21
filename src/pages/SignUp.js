import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {replace} from 'connected-react-router';
import {Redirect} from 'react-router-dom';

import api from '../jsonapi';
import ACTION from '../actions';
import {AppBar} from '../components';


function Button(props){
  if (props.isLogging){
    return(
      <button class="btn btn-link loading" onClick={undefined}></button>
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

        <AppBar noButton />

        <div class="container grid-sm">
          <div class="columns">
            <div class="column col-12 col-mx-auto mt-100px px-20px">
              <form class="card"
                    id="signup-form"
                    onSubmit={(e)=>this.handleSignup(e, this)}   
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
                         name="account"
                         placeholder="Password"
                  />
                  <Button isLoading={this.state.isSigning} />
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
    signup: ()=>replace('/login/'),
  },
  dispatch
);

SignUp = connect(stateMap, dispatchMap)(SignUp);
export default SignUp;
