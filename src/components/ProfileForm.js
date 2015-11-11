import React, { Component, PropTypes } from 'react';

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
    form,
    setEditMode,
    save,
    cancel,
    appendProfileForm,
    logoutAndRedirect
  }) {
    if (isEditMode) {
      return <ProfileFormEdit
        user={user}
        form={form}
        append={appendProfileForm}
        saveInProgress={saveInProgress}
        cancel={cancel}
        save={save} />;
    } else {
      return <ProfileFormDefault
        user={user}
        logoutAndRedirect={logoutAndRedirect}
        isEditMode={isEditMode}
        setEditMode={setEditMode} />
    }
  }
}

export default ProfileForm;
