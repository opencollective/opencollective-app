import React, { Component, PropTypes } from 'react';

class ApproveButton extends Component {
  propTypes: {
    groupid: PropTypes.string.isRequired,
    transactionid: PropTypes.string.isRequired,
    approveTransaction: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div className='Button Button--approve' onClick={this.handleClick.bind(this)}>
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
