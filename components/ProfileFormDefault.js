import React, { Component } from 'react';

import Currency from './Currency';

class ProfileFormDefault extends Component {
  render() {
    const { user, logoutAndRedirect } = this.props;
    const { paypalEmail, email } = user;

    return (
      <div className='ProfileForm'>

        {item('User email', email)}
        {email !== paypalEmail ? item('Paypal email', paypalEmail) : '' }
        {balance(this.props)}

        <div className='ProfileForm-buttonContainer'>
          <div
            className='Button ProfileForm-button'
            onClick={this.toggleEditMode.bind(this)}>
            Edit profile
          </div>
        </div>
        <div className='ProfileForm-buttonContainer'>
          <div
            className='ProfileForm-logout'
            onClick={logoutAndRedirect}>
            Sign Out
          </div>
        </div>

      </div>
    );
  }

  toggleEditMode() {
    const { isEditMode, setEditMode } = this.props;

    setEditMode(!isEditMode);
  }

}

function item(label, email) {
  return (
    <div>
      <div className='ProfileForm-label'>
        {label}
      </div>
      <div className='ProfileForm-email'>
        {email}
      </div>
    </div>
  );
};

export function balance({preapprovalDetails, getPreapprovalKey, userid}) {
  if (!preapprovalDetails.maxTotalAmountOfAllPayments) return '';

  const {
    curPaymentsAmount,
    maxTotalAmountOfAllPayments,
    senderEmail
  } = preapprovalDetails;

  const difference = parseFloat(maxTotalAmountOfAllPayments) - parseFloat(curPaymentsAmount);

  return item('Preapproved account', (
    <span>
      {senderEmail} pre approved for <Currency value={maxTotalAmountOfAllPayments} /> (
      <Currency value={difference} /> remaining)
      <span className='u-lightBlue' onClick={getPreapprovalKey.bind(this, userid)}>
        reapprove
      </span>
    </span>
  ));
};

export default ProfileFormDefault;

