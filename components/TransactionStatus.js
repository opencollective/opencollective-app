import React, { Component, PropTypes } from 'react';
import Icon from './Icon';

class TransactionStatus extends Component {
  propTypes: {
    approvedAt: PropTypes.string.isRequired,
    approved: PropTypes.bool.isRequired
  }

  render() {
    const { approvedAt, approved } = this.props;

    let status;
    let iconType;

    if (approvedAt && approved) {
      status = 'Approved';
      iconType = 'approved';
    } else if (approvedAt && !approved) {
      status = 'Rejected';
      iconType = 'rejected';
    } else {
      status = 'Pending';
      iconType = 'pending';
    }

    return (
      <span className='TransactionStatus'>
        <Icon type={iconType} />{status}
      </span>
    );
  }

}

export default TransactionStatus;
