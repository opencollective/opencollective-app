import React, { Component, PropTypes } from 'react';
import AsyncButton from './AsyncButton';
import Icon from './Icon';

// Leave non shallow until proper way of testing them
class ApproveButton extends Component {
  render() {
    const { approveTransaction, inProgress } = this.props;

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
}

ApproveButton.propTypes = {
  approveTransaction: PropTypes.func.isRequired,
  inProgress: PropTypes.bool.isRequired
};

export default ApproveButton;
