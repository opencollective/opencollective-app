import React, { Component } from 'react';

class TransactionStatus extends Component {
  render() {
    const { approvedAt, approved } = this.props;

    let status;

    if (approvedAt && approved) status = 'Approved';
    else if (approvedAt && !approved) status = 'Rejected';
    else status = 'Pending';

    return (
      <span>
        {status}
      </span>
    );
  }

}

export default TransactionStatus;
