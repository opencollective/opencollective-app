import React, { Component } from 'react';

import ProfilePhotoUpload from './ProfilePhotoUpload';
import SaveButton from './SaveButton';
import CancelButton from './CancelButton';
import Input from './Input';

class ProfileFormEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      user,
      save,
      saveInProgress,
      cancel,
      error
    } = this.props;

    return (
      <div className='ProfileForm'>
        <div className='Profile-header'>
          <ProfilePhotoUpload
            {...this.props}
            value={this.state.link || user.avatar}
            onFinished={link => this.setState({link})} />
        </div>

        <label>Paypal Account</label>
        <Input
          type='email'
          customClass='ProfileForm-input'
          placeholder='user@email.com'
          hasError={error.paypalEmail}
          value={this.state.paypalEmail || user.paypalEmail}
          handleChange={paypalEmail => this.setState({paypalEmail})}/>
        <div>
          <SaveButton
            save={() => save(this.state)}
            inProgress={saveInProgress} />
          <CancelButton
            cancel={cancel}
            inProgress={false} />
        </div>
      </div>
    );
  }

}

export default ProfileFormEdit;
