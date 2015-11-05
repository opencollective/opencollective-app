import React, { Component, PropTypes } from 'react';

class ProfileFormDefault extends Component {
  render() {
    const { user, isEditMode } = this.props;
    const email = user.paypalEmail || user.email;

    return (
      <div className='ProfileForm'>
        <div className='ProfileForm-label'>
          Paypal Account
        </div>
        <div className='ProfileForm-email'>
          {email}
        </div>
        <div className='ProfileForm-buttonContainer'>
          <div
            className='Button ProfileForm-button'
            onClick={this.toggleEditMode.bind(this)}>
            Edit profile
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

export default ProfileFormDefault;
