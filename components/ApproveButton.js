import React, { Component, PropTypes } from 'react';
import AsyncButton from './AsyncButton';
import Icon from './Icon';

const ApproveButton = ({approveTransaction, inProgress}) => {
  return (
    <div>
      <AsyncButton
        customClass='Button--approve'
        inProgress={inProgress}
        onClick={approveTransaction.bind(this)}>
        <Icon type='approved' /> Approve
      </AsyncButton>
    </div>
  );
}

ApproveButton.propTypes = {
  approveTransaction: PropTypes.func.isRequired,
  inProgress: PropTypes.bool.isRequired
};

export default ApproveButton;
