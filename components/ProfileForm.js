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

  form({
    isEditMode,
    saveInProgress,
    user,
    userid,
    form,
    setEditMode,
    save,
    cancel,
    appendProfileForm,
    logoutAndRedirect,
    preapprovalDetails,
    getPreapprovalKey
  }) {
    if (isEditMode) {
      return (
        <ProfileFormEdit
          user={user}
          form={form}
          append={appendProfileForm}
          saveInProgress={saveInProgress}
          cancel={cancel}
          save={save} />
      );
    } else {
      return (
        <ProfileFormDefault
          user={user}
          userid={userid}
          preapprovalDetails={preapprovalDetails}
          logoutAndRedirect={logoutAndRedirect}
          isEditMode={isEditMode}
          setEditMode={setEditMode}
          getPreapprovalKey={getPreapprovalKey} />
      );
    }
  }
}

export default ProfileForm;
