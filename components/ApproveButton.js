import React, { Component, PropTypes } from 'react';
import Icon from './Icon';

class ApproveButton extends Component {
  propTypes: {
    approveTransaction: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div
        className='Button Button--approve'
        onClick={this.props.approveTransaction.bind(this)} >
        <Icon type='approved' /> Approve
      </div>
    );
  }
}

export default ApproveButton;
