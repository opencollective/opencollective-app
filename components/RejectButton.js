import React, { Component } from 'react';
import { rejectTransaction } from '../actions/transactions';

class RejectButton extends Component {
  propTypes: {
    groupid: React.PropTypes.string.isRequired,
    transactionid: React.PropTypes.string.isRequired,
    rejectTransaction: React.PropTypes.func.isRequired,
  }

  render() {
    return (
      <div className='Button Button--reject' onClick={this.handleClick.bind(this)}>
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
