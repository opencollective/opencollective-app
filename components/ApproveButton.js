import React, { Component } from 'react';

class ApproveButton extends Component {
  render() {
    const className = 'btn btn-primary mb1 bg-green';
    const {sendApproveTransaction} = this.props;
    const onClick = () => sendApproveTransaction();

    return (
      <div className={className} onClick={onClick}>
        Approve
      </div>
    );
  }
}

export default ApproveButton;
