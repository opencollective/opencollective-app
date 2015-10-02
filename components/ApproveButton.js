import React, { Component } from 'react';

class ApproveButton extends Component {
  propTypes: {
    groupid: React.PropTypes.string.isRequired,
    transactionid: React.PropTypes.string.isRequired,
    approveTransaction: React.PropTypes.func.isRequired,
  }

  render() {
    const className = 'btn btn-primary mb1 px4 py3 bg-green';
    return (
      <div ref='button' className={className} onClick={this.handleClick.bind(this)}>
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
