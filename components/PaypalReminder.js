import React, { Component } from 'react';
import AsyncButton from './AsyncButton';

class PaypalReminder extends Component {
  render() {
    return (
      <div className='PaypalReminder'>
        Please, connect your PayPal account to start sending funds.
         <AsyncButton
          customClass='Button--paypal'
          inProgress={this.props.inProgress}
          onClick={this.props.getApprovalKey.bind(this)}>
          Login with Paypal
        </AsyncButton>
      </div>
    );
  }
}

export default PaypalReminder;
