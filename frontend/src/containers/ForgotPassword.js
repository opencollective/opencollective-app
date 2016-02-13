import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replaceState } from 'redux-router';
import Joi from 'joi';

import notify from '../actions/notification/notify';
import resetNotifications from '../actions/notification/reset';
import sendResetPasswordLink from '../actions/users/send_reset_password_link';
import validate from '../actions/form/validate_schema';

import Content from './Content';

import TopBar from '../components/TopBar';
import Notification from '../components/Notification';
import Input from '../components/Input';
import SubmitButton from '../components/SubmitButton';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inProgress: false,
      form: {
        email: ''
      }
    };
    this.schema = Joi.object().keys({
      email: Joi.string().email().required()
    });
  }

  render() {
    return (
      <div className='ForgotPassword'>
        <TopBar title='Forgot your password' />
        <Content>
          <Notification {...this.props} />
          <p className='u-py1'>
            We will send you an email with a link to reset your password.
          </p>
          <form
            name='forgot'
            onSubmit={this.handleSubmit.bind(this)}
            className='ForgotPassword-form'>
            <Input
              type='email'
              placeholder='email@example.com'
              value={this.state.form.email}
              hasError={this.props.error.email}
              handleChange={this.handleChange.bind(this)} />
            <SubmitButton
              inProgress={this.state.inProgress}>
              Send email
            </SubmitButton>
          </form>
        </Content>
      </div>
    );
  }

  handleChange(email) {
    this.setState({form: {email} });
  }

  handleSubmit(event) {
    const {
      sendResetPasswordLink,
      notify,
      validate
    } = this.props;

    event.preventDefault();

    this.setState({ inProgress: true });

    validate(this.state.form, this.schema)
      .then(() => sendResetPasswordLink(this.state.form.email))
      .then(() => notify('success', 'Email sent'))
      .catch(({message}) => notify('error', message))
      .then(() => this.setState({ inProgress: false }));
  }

}

export default connect(mapStateToProps, {
  replaceState,
  notify,
  resetNotifications,
  sendResetPasswordLink,
  validate
})(ForgotPassword);

function mapStateToProps({notification, form}) {
  return {
    notification,
    error: form.schema.error
  };
}
