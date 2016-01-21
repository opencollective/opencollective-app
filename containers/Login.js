import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replaceState } from 'redux-router';

import login from '../actions/session/login';
import notify from '../actions/notification/notify';
import resetNotifications from '../actions/notification/reset';
import resetLoginForm from '../actions/form/reset_login';
import validateLogin from '../actions/form/validate_login';

import Content from './Content';

import TopBar from '../components/TopBar';
import Notification from '../components/Notification';
import Input from '../components/Input';
import SubmitButton from '../components/SubmitButton';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='Login'>
        <TopBar title='Sign in' />
        <Content>
          <Notification {...this.props} />
          <div>
            <div className='Login-logo'>
              <img src='/static/images/logo.svg' />
            </div>
            <div className='Login-quote'>
              Collect & disburse money<br />transparently
            </div>
          </div>
          <form
            name='login'
            onSubmit={this.handleSubmit.bind(this)}
            className='Login-form'>
            <Input
              type='email'
              hasError={this.props.error.email}
              placeholder='email@example.com'
              value={this.state.email}
              handleChange={email => this.setState({email})} />
            <Input
              type='password'
              hasError={this.props.error.password}
              placeholder='******'
              value={this.state.password}
              handleChange={password => this.setState({password})} />
            <div className='Login-buttonContainter'>
              <SubmitButton>
                Login
              </SubmitButton>
            </div>
          </form>
        </Content>
      </div>
    );
  }

  handleSubmit(event) {
    const {
      replaceState,
      notify,
      redirectRoute,
      login,
      validateLogin
    } = this.props;

    const user = this.state;

    event.preventDefault();

    validateLogin(user)
    .then(() => login(user))
    .then(() => replaceState(null, redirectRoute))
    .catch(({message}) => notify('error', message));
  }

}

export default connect(mapStateToProps, {
  login,
  replaceState,
  resetLoginForm,
  notify,
  validateLogin,
  resetNotifications
})(Login);

function mapStateToProps({notification, router, form}) {
  return {
    notification,
    error: form.login.error,
    redirectRoute: router.location.query.next || '/app/'
  };
}
