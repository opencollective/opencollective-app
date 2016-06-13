import React, { Component, PropTypes } from 'react';
import AsyncButton from './AsyncButton';
import Icon from './Icon';

// Leave non shallow until proper way of testing them
class RejectButton extends Component {
  render() {
    const {rejectExpense, inProgress, disabled} = this.props;

    return (
      <div>
        <AsyncButton
          customClass='Button--reject'
          inProgress={inProgress}
          disabled={disabled}
          onClick={rejectExpense.bind(this)}>
          <Icon type='rejected' /> Reject
        </AsyncButton>
      </div>
    );
  }
}

RejectButton.propTypes = {
  rejectExpense: PropTypes.func.isRequired,
  inProgress: PropTypes.bool.isRequired
};

export default RejectButton;
