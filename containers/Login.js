import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

import { login } from '../actions/users';
import { notify } from '../actions/notification';
import { resetLoginForm, appendLoginForm } from '../actions/form';

import Content from './Content';
import Header from '../components/Header';
import Notification from '../components/Notification';
import Input from '../components/Input';
import LoginHeader from '../components/LoginHeader';

class Login extends Component {
  render() {
    return (
      <div>
        <Header title='Sign in' />
        <Content>
          <Notification {...this.props.notification} />
          {LoginHeader()}
          <form
            name='login'
            onSubmit={this.handleSubmit.bind(this)}
            className='padded'>
            <input
              className='Field'
              type='email'
              placeholder='email@example.com'
              onChange={this.handleField.bind(this, 'email')} />
            <input
              className='Field'
              type='password'
              placeholder='******'
              onChange={this.handleField.bind(this, 'password')} />
            <button
              type='submit'
              className='Button Button--login'>
              Login
            </button>
          </form>

        </Content>
      </div>
    );
  }

  handleSubmit(e) {
    const { credentials, login, pushState, notify } = this.props;

    e.preventDefault();

    login(credentials)
    .then(response => {
      if (!response.error) {
        pushState(null, '/');
      } else {
        notify('error', response.error);
      }
    });
  }

  handleField(key, event) {
    this.props.appendLoginForm({
      [key]: event.target.value
    });
  }
}

export default connect(mapStateToProps, {
  login,
  pushState,
  resetLoginForm,
  appendLoginForm,
  notify
})(Login);

function mapStateToProps(state) {
  return {
    credentials: state.form.login.attributes,
    notification: state.notification
  };
}
