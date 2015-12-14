import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import Currency from './Currency';

const ProfilePreapproved = ({
  preapprovalDetails,
  getPreapprovalKey,
  userid
}) => {
  const {
    curPaymentsAmount,
    maxTotalAmountOfAllPayments,
  } = preapprovalDetails;
  const difference = parseFloat(maxTotalAmountOfAllPayments) - parseFloat(curPaymentsAmount);

  return (
   <div className='ProfilePreapproved'>
    <div className='ProfilePreapproved-balance'>
      Preapproved for <Currency value={maxTotalAmountOfAllPayments} /> (
      <Currency value={difference} /> remaining)
    </div>
    <div
      className='ProfilePreapproved-reapprove'
      onClick={getPreapprovalKey.bind(this, userid)}>
      Reapprove for <Currency value={2000} />
    </div>
   </div>
  );
};


export default ProfilePreapproved;
