import React, { Component } from 'react';

class Transaction extends Component {
  render() {
    const {amount, description} = this.props;
    return (
      <div>
        <h3>{description} ({amount})</h3>
      </div>
    );
  }
}

export default Transaction;
