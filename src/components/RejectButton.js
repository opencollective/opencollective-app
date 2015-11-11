import React, { Component, PropTypes } from 'react';
import AsyncButton from './AsyncButton';
import Icon from './Icon';

// Leave non shallow until proper way of testing them
class RejectButton extends Component {
  render() {
    const {rejectTransaction, inProgress} = this.props;

    return (
      <div>
        <AsyncButton
          customClass='Button--reject'
          inProgress={inProgress}
          onClick={rejectTransaction.bind(this)}>
          <Icon type='rejected' /> Reject
        </AsyncButton>
      </div>
    );
  }
}

RejectButton.propTypes = {
  rejectTransaction: PropTypes.func.isRequired,
  inProgress: PropTypes.bool.isRequired
};

export default RejectButton;
