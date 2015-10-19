import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replaceState } from 'redux-router';
import { login } from '../actions/session';
import { notify } from '../actions/notification';
import {
  resetLoginForm,
  appendLoginForm,
  validateLogin
} from '../actions/form';
import Content from './Content';
import Header from '../components/Header';
import Notification from '../components/Notification';
import LoginHeader from '../components/LoginHeader';
import LoginForm from '../components/LoginForm';

class Login extends Component {
  render() {
    return (
      <div>
        <Header title='Sign in' />
        <Content>
          <Notification {...this.props.notification} />
          <LoginHeader />
          <LoginForm
            {...this.props}
            handleField={this.handleField.bind(this)}
            handleSubmit={this.handleSubmit.bind(this)} />
        </Content>
      </div>
    );
  }

  handleSubmit(event) {
    const {
      attributes,
      replaceState,
      notify
    } = this.props;

    event.preventDefault();

    this.validate(attributes)
    .then(() => this.login(attributes))
    .then(() => replaceState(null, '/'))
    .catch(error => notify('error', error.message));
  }

  validate(attributes) {
    return this.props.validateLogin(attributes)
    .then(({error}) => {
      return error ?
        Promise.reject(this.props.errorMessage) :
        Promise.resolve(attributes);
    });
  }

  login(attributes) {
    return this.props.login(attributes)
    .then((response) => {
      const error = response.error;
      return error ? Promise.reject(error) : Promise.resolve(attributes);
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
  replaceState,
  resetLoginForm,
  appendLoginForm,
  notify,
  validateLogin
})(Login);

function mapStateToProps(state) {
  return {
    attributes: state.form.login.attributes,
    notification: state.notification,
    errorMessage: state.form.login.error
  };
}
