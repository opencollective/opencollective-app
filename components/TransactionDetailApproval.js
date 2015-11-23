import React from 'react';
import ApproveButton from './ApproveButton';
import RejectButton from './RejectButton';

export default ({
  approveTransaction,
  rejectTransaction,
  approveInProgress,
  rejectInProgress,
  transaction
}) => {
  let controls;

  if (transaction.reimbursedAt) {
    controls = <span>This transaction has already been reimbursed</span>;
  } else if (transaction.id) {
    controls = (
      <div>
        <ApproveButton
          approveTransaction={approveTransaction}
          inProgress={approveInProgress} />
        <RejectButton
          rejectTransaction={rejectTransaction}
          inProgress={rejectInProgress} />
      </div>
    );
  }

  return (
    <div className='TransactionDetail-controls'>
      {controls}
    </div>
  );
};
