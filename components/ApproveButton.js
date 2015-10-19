import React, { Component, PropTypes } from 'react';
import AsyncButton from './AsyncButton';
import Icon from './Icon';

class ApproveButton extends Component {
  propTypes: {
    approveTransaction: PropTypes.func.isRequired,
    inProgress: PropTypes.bool.isRequired
  }

  render() {
    return (
      <div>
        <AsyncButton
          customClass='Button--approve'
          inProgress={this.props.inProgress}
          onClick={this.props.approveTransaction.bind(this)}>
          <Icon type='approved' /> Approve
        </AsyncButton>
      </div>
    );
  }
}

export default ApproveButton;
