import React, { Component } from 'react';

class ProfileFormDefault extends Component {
  render() {
    const { user, logoutAndRedirect } = this.props;
    const { paypalEmail, email } = user;

    return (
      <div className='ProfileForm'>
        {this.listItem('User email', email)}
        {email !== paypalEmail ?
            this.listItem('Paypal email', paypalEmail) : '' }
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

  listItem(label, email) {
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
  }

}

export default ProfileFormDefault;
