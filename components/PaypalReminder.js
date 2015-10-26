import React, { Component } from 'react';
import AsyncButton from './AsyncButton';

class PaypalReminder extends Component {
  render() {
    const status = this.props.approvalStatus;
    const hideButton = status === 'success' || status === 'failure';

    return (
      <div className='PaypalReminder'>
        {this.message(status)}
        {hideButton ? null : this.button(this.props)}
      </div>
    );
  }

  message(status) {
    if (status === 'success') {
      return 'You have successfully approved your Paypal account';
    } else if (status === 'failure') {
      return 'Something went wrong. Please try again later';
    } else {
      return 'Please, connect your PayPal account to start sending funds.'
    }
  }

  button({inProgress, getApprovalKey}) {
    return (
      <AsyncButton
        customClass='Button--paypal'
        inProgress={inProgress}
        onClick={getApprovalKey}>
        Login with Paypal
      </AsyncButton>
    );
  }
}

export default PaypalReminder;
