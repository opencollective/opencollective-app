import React, { Component } from 'react';

import ProfilePhotoUpload from './ProfilePhotoUpload';
import SaveButton from './SaveButton';
import CancelButton from './CancelButton';
import Input from './Input';

class ProfileFormEdit extends Component {
  render() {
    const {
      user,
      form,
      save,
      saveInProgress,
      cancel,
      appendProfileForm
    } = this.props;
    const { paypalEmail } = user;

    return (
      <div className='ProfileForm'>
        <div className='Profile-header'>
          <ProfilePhotoUpload
          {...this.props}
          value={form.attributes.link || user.avatar}
          onFinished={link => appendProfileForm({link})} />
        </div>
        <div className='ProfileForm-label'>Password reset</div>
        <Input
          type='password'
          customClass='ProfileForm-input'
          placeholder='Password'
          value={form.attributes.password}
          handleChange={password => appendProfileForm({password})} />

        <Input
          type='password'
          customClass='ProfileForm-input'
          placeholder='Password confirmation'
          value={form.attributes.passwordConfirmation}
          handleChange={passwordConfirmation => appendProfileForm({passwordConfirmation})}/>

        <div className='ProfileForm-label'>
          Paypal Account
        </div>
        <Input
          type='email'
          customClass='ProfileForm-input'
          placeholder='user@email.com'
          value={form.attributes.paypalEmail || paypalEmail}
          handleChange={paypalEmail => appendProfileForm({paypalEmail})}/>
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

}

export default ProfileFormEdit;
