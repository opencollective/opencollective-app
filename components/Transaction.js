import React, { Component } from 'react';

class Transaction extends Component {
  render() {
    const {amount, description} = this.props;
    return (
      <div className="border-bottom py2 px2">
        {description} <span className="right">{amount}</span>
      </div>
    );
  }
}

export default Transaction;
