import React, { Component, PropTypes } from 'react';

class TransactionStatus extends Component {
  propTypes: {
    approvedAt: PropTypes.string.isRequired,
    approved: PropTypes.bool.isRequired
  }

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
