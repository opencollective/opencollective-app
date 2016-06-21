import React, { PropTypes } from 'react';

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

  const max = parseFloat(maxTotalAmountOfAllPayments);
  const current = parseFloat(curPaymentsAmount);

  return (
   <div className='ProfilePreapproved'>
    <div className='ProfilePreapproved-balance'>
      Total amount already reimbursed: <Currency value={current} precision={2} inCents={false} /> (<Currency value={max - current} precision={2} inCents={false}/> remaining)
    </div>
    <div
      className='ProfilePreapproved-reapprove'
      onClick={getPreapprovalKey.bind(this, userid)}>
      Reapprove for <Currency value={2000} precision={2} /> now
    </div>
    <div className='ProfilePreapproved-info'>
      For security reasons, you can only reimburse expenses for up to <Currency value={200000} precision={0}/>. Then you will have to reauthenticate your Paypal account again.<br />
    </div>
   </div>
  );
};

ProfilePreapproved.propTypes = {
  userid: PropTypes.number.isRequired,
  preapprovalDetails: PropTypes.shape({
    maxTotalAmountOfAllPayments: PropTypes.string.isRequired,
    curPaymentsAmount: PropTypes.string.isRequired
  }),
  getPreapprovalKey: PropTypes.func.isRequired
};

export default ProfilePreapproved;

