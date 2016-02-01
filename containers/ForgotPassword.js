import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replaceState } from 'redux-router';

import notify from '../actions/notification/notify';
import resetNotifications from '../actions/notification/reset';
import sendResetPasswordLink from '../actions/users/send_reset_password_link';

import Content from './Content';

import TopBar from '../components/TopBar';
import Notification from '../components/Notification';
import Input from '../components/Input';
import SubmitButton from '../components/SubmitButton';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inProgress: false
    };
  }

  render() {
    return (
      <div className='ForgotPassword'>
        <TopBar title='Forgot your password' />
        <Content>
          <Notification {...this.props} />
          <p>
            We will send you an email with a link to a page to reset your password.
          </p>
          <form
            name='forgot'
            onSubmit={this.handleSubmit.bind(this)}
            className='ForgotPassword-form'>
            <Input
              type='email'
              placeholder='email@example.com'
              value={this.state.email}
              handleChange={email => this.setState({email})} />

            <div className='ForgotPassword-buttonContainter'>
              <SubmitButton
                inProgress={this.state.inProgress}>
                Send email
              </SubmitButton>
            </div>
          </form>
        </Content>
      </div>
    );
  }

  handleSubmit(event) {
    const {
      sendResetPasswordLink,
      notify,
    } = this.props;

    event.preventDefault();

    this.setState({ inProgress: true });

    sendResetPasswordLink(this.state.email)
      .then(() => notify('success', 'Email sent'))
      .catch(({message}) => notify('error', message))
      .then(() => this.setState({ inProgress: false }));
  }

}

export default connect(mapStateToProps, {
  replaceState,
  notify,
  resetNotifications,
  sendResetPasswordLink
})(ForgotPassword);

function mapStateToProps({notification}) {
  return {
    notification
  };
}
