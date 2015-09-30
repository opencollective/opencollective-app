import React, { Component } from 'react';

class RejectButton extends Component {
  render() {
    const className = 'btn btn-primary mb1 bg-red';
    const {sendRejectTransaction} = this.props;
    const onClick = () => sendRejectTransaction();

    return (
      <div className={className} onClick={onClick}>
        Reject
      </div>
    );
  }

  handleClick() {
    console.log('Reject');
  }
}

export default RejectButton;
