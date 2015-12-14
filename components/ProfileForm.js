import React, { Component } from 'react';

import ProfileFormDefault from './ProfileFormDefault';
import ProfileFormEdit from './ProfileFormEdit';

class ProfileForm extends Component {
  render() {
    return (
      <div className='ProfileForm'>
        {this.form(this.props)}
      </div>
    );
  }

  form(props) {
    if (props.isEditMode) {
      return <ProfileFormEdit {...props} />;
    } else {
      return <ProfileFormDefault {...props} />;
    }
  }
}

export default ProfileForm;
