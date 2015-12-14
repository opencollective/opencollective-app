import React, { Component } from 'react';

import ProfilePreapproved from './ProfilePreapproved';

class ProfileFormDefault extends Component {
  render() {
    const {
      user,
      logoutAndRedirect,
      hasPreapproved,
      preapprovalDetails
    } = this.props;
    const { paypalEmail, email } = user;

    return (
      <div className='ProfileForm'>

        {item('User email', email)}
        {item('Paypal receiver email', paypalEmail)}
        {item('Paypal sender email', preapprovalDetails.senderEmail)}

        {hasPreapproved ? <ProfilePreapproved {...this.props} /> : ''}

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
  if (!email) return '';

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

export default ProfileFormDefault;

