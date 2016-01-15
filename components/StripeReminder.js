import React, { Component } from 'react';

import AsyncButton from './AsyncButton';

class StripeReminder extends Component {

  constructor(props) {
    super(props);
    this.state = { inProgress: false };
  }

  render() {

     return (
      <div className='Reminder'>
        Please connect your Stripe account to receive donations <br/>
        <AsyncButton
          customClass='Button--stripe'
          inProgress={this.state.inProgress}
          onClick={this.handleClick.bind(this)}>
          Authenticate with Stripe
        </AsyncButton>
      </div>
    );
  }

  handleClick() {
    this.setState({inProgress: true});

    this.props.authorizeStripe()
    .then(() => this.setState({inProgress: false}))
    .catch(() => this.setState({inProgress: false}));
  }
}

export default StripeReminder;
