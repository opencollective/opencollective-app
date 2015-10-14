import React, { Component } from 'react';
import Icon from './Icon';

class RejectButton extends Component {
  propTypes: {
    rejectTransaction: React.PropTypes.func.isRequired,
  }

  render() {
    return (
      <div
        className='Button Button--reject'
        onClick={this.props.rejectTransaction.bind(this)}>
        <Icon type='rejected' /> Reject
      </div>
    );
  }
}

export default RejectButton;
