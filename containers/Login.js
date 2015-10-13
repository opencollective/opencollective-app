import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { login } from '../actions/users';
import { resetLoginForm, appendLoginForm } from '../actions/form';
import Header from '../components/Header';
import Notification from '../components/Notification';
import Input from '../components/Input';
import LoginHeader from '../components/LoginHeader';
import Content from './Content';

class Login extends Component {
  render() {
    return (
      <div>
        <Header title='Sign in' />
        <Content>
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
    e.preventDefault();

    const { email, password } = this.state;
    const { login } = this.props;

    login(email, password)
    .then(response => {
      if (!response.error) {
        window.location = '#/';
        window.location.reload();
      } else {
        this.setState({
          notification: {
            message: response.error,
            type: 'error'
          }
        });
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
  appendLoginForm
})(Login);

function mapStateToProps() {
  return {};
}
