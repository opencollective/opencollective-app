import React, { Component } from 'react';

class ApproveButton extends Component {
  render() {
    const className = 'btn btn-primary mb1 bg-green';
    return (
      <div className={className} onClick={this.handleClick.bind(this)}>
        Approve
      </div>
    );
  }

  handleClick() {
    const { groupid, transactionid, approveTransaction } = this.props;
    approveTransaction(groupid, transactionid);
  }
}

export default ApproveButton;
