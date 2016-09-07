import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replaceState } from 'redux-router';
import Joi from 'joi';

import notify from '../actions/notification/notify';
import resetNotifications from '../actions/notification/reset';
import resetPassword from '../actions/users/reset_password';
import validate from '../actions/form/validate_schema';

import Content from './Content';

import TopBar from '../components/TopBar';
import Notification from '../components/Notification';
import Input from '../components/Input';
import SubmitButton from '../components/SubmitButton';

class ResetPassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inProgress: false
    };

    this.schema = Joi.object().keys({
      password: Joi
        .string()
        .required()
        .label('Password'),
      passwordConfirmation: Joi.any()
        .required()
        .valid(Joi.ref('password'))
        .label('password confirmation')
        .options({ language: { any: { allowOnly: 'must match password' } }})
    });
  }

  render() {
    return (
      <div className='ResetPassword'>
        <TopBar title='Reset password' />
        <Content>
          <Notification {...this.props} />
          <div className='padded'>
            <p className='u-py1'>Enter your new password</p>
            <form
              name='forgot'
              onSubmit={this.handleSubmit.bind(this)}
              className='ResetPassword-form'>
              <Input
                type='password'
                placeholder='******'
                value={this.state.password}
                handleChange={password => this.setState({password})} />
              <Input
                type='password'
                placeholder='******'
                value={this.state.passwordConfirmation}
                handleChange={passwordConfirmation => this.setState({passwordConfirmation})} />

              <SubmitButton
                inProgress={this.state.inProgress}>
                Confirm
              </SubmitButton>
            </form>
          </div>
        </Content>
      </div>
    );
  }

  handleSubmit(event) {
    const {
      resetToken,
      userToken,
      resetPassword,
      validate,
      notify,
      replaceState
    } = this.props;

    event.preventDefault();

    this.setState({ inProgress: true });

    return validate({
      password: this.state.password,
      passwordConfirmation: this.state.passwordConfirmation
    }, this.schema)
      .then(() => resetPassword(userToken, resetToken, this.state.password))
      .then(() => notify('success', 'Password reset. Redirecting to login page'))
      .then(() => replaceState(null, `/login?notify=Password reset successfully. Please login with new password.`))
      .catch(({message}) => notify('error', message))
      .then(() => this.setState({ inProgress: false }));
  }

}

export default connect(mapStateToProps, {
  replaceState,
  notify,
  resetNotifications,
  resetPassword,
  validate
})(ResetPassword);

function mapStateToProps({notification, router}) {
  return {
    resetToken: router.params.resettoken,
    userToken: router.params.usertoken,
    notification
  };
}
