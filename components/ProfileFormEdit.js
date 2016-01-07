import React, { Component } from 'react';

import ProfilePhotoUpload from './ProfilePhotoUpload';
import SaveButton from './SaveButton';
import CancelButton from './CancelButton';

class ProfileFormEdit extends Component {
  render() {
    const {
      user,
      form,
      save,
      saveInProgress,
      cancel
    } = this.props;
    const { paypalEmail } = user;

    return (
      <div className='ProfileForm'>
        <div className='Profile-header'>
          <ProfilePhotoUpload
          {...this.props}
          newUrl={form.attributes.link}
          currentUrl={user.avatar}
          onFinished={this.handleUpload.bind(this)} />
        </div>
        <div className='ProfileForm-label'>
          Paypal Account
        </div>
        <input
          type='email'
          className='Field ProfileForm-field'
          placeholder= 'user@email.com'
          value={form.attributes.paypalEmail || paypalEmail}
          onChange={this.append.bind(this)} />
        <div>
          <SaveButton
            save={save}
            inProgress={saveInProgress} />
          <CancelButton
            cancel={cancel}
            inProgress={false} />
        </div>
      </div>
    );
  }

  append({target}) {
    this.props.appendProfileForm({
      paypalEmail: target.value
    });
  }

  handleUpload({url}) {
    this.props.appendProfileForm({ link: url });
  }
}

export default ProfileFormEdit;
