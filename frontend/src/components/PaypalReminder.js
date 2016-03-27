import React, { Component } from 'react';
import AsyncButton from './AsyncButton';

class PaypalReminder extends Component {
  render() {
    const status = this.props.approvalStatus;
    const hideButton = status === 'success' || status === 'failure';

    return (
      <div className='Reminder PaypalReminder'>
        {this.message(status)}
        {hideButton ? null : this.button(this.props)}
      </div>
    );
  }

  message(status) {
    if (status === 'success') {
      return 'You have successfully connected your PayPal account.';
    } else if (status === 'failure') {
      return 'Something went wrong. Please try again later.';
    } else {
      return 'Please, connect your PayPal account to assign funds to your collectives and to reimburse their expenses.'
    }
  }

  button({inProgress, getPreapprovalKey}) {
    return (
      <AsyncButton
        customClass='Button--paypal'
        inProgress={inProgress}
        onClick={getPreapprovalKey}>
        Connect PayPal
      </AsyncButton>
    );
  }
}

export default PaypalReminder;
