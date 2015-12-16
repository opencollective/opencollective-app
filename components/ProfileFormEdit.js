import React, { Component } from 'react';

import SaveButton from './SaveButton';
import CancelButton from './CancelButton';

class ProfileFormEdit extends Component {
  render() {
    const {
      form,
      save,
      saveInProgress,
      cancel
    } = this.props;

    return (
      <div className='ProfileForm'>
        <div className='ProfileForm-label'>
          Paypal Account
        </div>
        <input
          type='email'
          className='Field ProfileForm-field'
          placeholder='user@email.com'
          value={form.attributes.paypalEmail}
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
}

export default ProfileFormEdit;
