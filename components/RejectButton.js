import React, { Component } from 'react';
import AsyncButton from './AsyncButton';
import Icon from './Icon';

class RejectButton extends Component {
  propTypes: {
    rejectTransaction: React.PropTypes.func.isRequired,
    inProgress: PropTypes.bool.isRequired
  }

  render() {
    return (
      <div>
        <AsyncButton
          customClass='Button--reject'
          inProgress={this.props.inProgress}
          onClick={this.props.rejectTransaction.bind(this)}>
          <Icon type='rejected' /> Reject
        </AsyncButton>
      </div>
    );
  }
}

export default RejectButton;
