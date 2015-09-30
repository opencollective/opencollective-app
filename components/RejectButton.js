import React, { Component } from 'react';
import { rejectTransaction } from '../actions/transactions';

class RejectButton extends Component {
  render() {
    const className = 'btn btn-primary mb1 bg-red';

    return (
      <div className={className} onClick={this.handleClick.bind(this)}>
        Reject
      </div>
    );
  }

  handleClick() {
    const { rejectTransaction, groupid, transactionid } = this.props;
    rejectTransaction(groupid, transactionid);
  }
}

export default RejectButton;
