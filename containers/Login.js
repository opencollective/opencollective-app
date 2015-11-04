import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replaceState } from 'redux-router';
import login from '../actions/session/login';
import notify from '../actions/notification/notify';
import resetNotifications from '../actions/notification/reset';
import resetLoginForm from '../actions/form/reset_login';
import appendLoginForm from '../actions/form/append_login';
import validateLogin from '../actions/form/validate_login';
import Content from './Content';
import Header from '../components/Header';
import Notification from '../components/Notification';
import LoginHeader from '../components/LoginHeader';
import LoginForm from '../components/LoginForm';

class Login extends Component {
  render() {
    const { notification, resetNotifications } = this.props;

    return (
      <div>
        <Header title='Sign in' />
        <Content>
          <Notification
            {...notification}
            resetNotifications={resetNotifications} />
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
    .catch(({message}) => notify('error', message));
  }

  validate(attributes) {
    return this.props.validateLogin(attributes)
    .then(() => {
      const error = this.props.error;
      return error.message ? Promise.reject(error) : Promise.resolve()
    });
  }

  login(attributes) {
    return this.props.login(attributes)
    .then((response) => {
      const error = response.error;
      return error ? Promise.reject(error) : Promise.resolve(attributes);
    });
  }

  handleField(key, value) {
    this.props.appendLoginForm({
      [key]: value
    });
  }
}

export default connect(mapStateToProps, {
  login,
  replaceState,
  resetLoginForm,
  appendLoginForm,
  notify,
  validateLogin,
  resetNotifications
})(Login);

function mapStateToProps(state) {
  return {
    attributes: state.form.login.attributes,
    notification: state.notification,
    error: state.form.login.error
  };
}
