import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Login from './Login';
import { login } from '../actions/users';

class LoginConnector extends Component {
  render() {
    return (
      <Login {...this.props} />
    );
  }
}

export default connect((store) => {
  return {};
}, (dispatch) => {
  return bindActionCreators({login}, dispatch);
})(LoginConnector);
