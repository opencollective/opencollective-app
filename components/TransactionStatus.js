import React, { PropTypes } from 'react';
import Icon from './Icon';

const TransactionStatus = ({approved, approvedAt, amount}) => {
  let status = 'Pending';
  let iconType = 'pending';

  if (approvedAt && approved) {
    status = 'Approved';
    iconType = 'approved';
  } else if (approvedAt && !approved) {
    status = 'Rejected';
    iconType = 'rejected';
  } else if (amount > 0) {
    status = 'Added';
    iconType = 'approved';
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
