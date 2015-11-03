import React, { Component, PropTypes } from 'react';
import Icon from './Icon';

const TransactionStatus = ({approved, approvedAt}) => {
  let status = 'Pending';
  let iconType = 'pending';

  if (approvedAt && approved) {
    status = 'Approved';
    iconType = 'approved';
  } else if (approvedAt && !approved) {
    status = 'Rejected';
    iconType = 'rejected';
  }

  return (
    <span className='TransactionStatus'>
      <Icon type={iconType} />{status}
    </span>
  );
}

TransactionStatus.propTypes = {
  approvedAt: PropTypes.string,
  approved: PropTypes.bool.isRequired
};

export default TransactionStatus;
