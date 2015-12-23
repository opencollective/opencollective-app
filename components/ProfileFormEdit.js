import React, { Component } from 'react';

import AvatarUpload from './AvatarUpload';
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
          <AvatarUpload
          {...this.props}
          url={form.attributes.link}
          onFinished={this.handleUpload.bind(this)} />
        </div>
        <div className='ProfileForm-label'>
          Paypal Account
        </div>
        <input
          type='email'
          className='Field ProfileForm-field'
          placeholder= 'user@email.com'
          value={paypalEmail || form.attributes.paypalEmail}
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
