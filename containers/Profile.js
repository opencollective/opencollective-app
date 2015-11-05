import React, { Component } from 'react';
import { connect } from 'react-redux';
import Content from './Content';
import Header from '../components/Header';
import ProfileHeader from '../components/ProfileHeader';
import ProfileForm from '../components/ProfileForm';
import Notification from '../components/Notification';
import setEditMode from '../actions/form/set_edit_mode_profile';
import appendProfileForm from '../actions/form/append_profile';
import validateProfile from '../actions/form/validate_profile';

import updatePaypalEmail from '../actions/users/update_paypal_email';
import fetchUser from '../actions/users/fetch_by_id';
import notify from '../actions/notification/notify';
import resetNotifications from '../actions/notification/reset';
import errorify from '../lib/errorify';

class Profile extends Component {
  render() {
    const { user, notification, resetNotifications } = this.props;

    return (
      <div className='Profile'>
        <Header title='Profile' hasBackButton={true} />
        <Content>
          <Notification
          {...notification}
          resetNotifications={resetNotifications} />
          <div className='padded'>
            <ProfileHeader {...user} />
            <ProfileForm
              {...this.props}
              save={this.save.bind(this)}
              cancel={this.cancel.bind(this)} />
          </div>
        </Content>
      </div>
    );
  }

  save() {
    const {
      user,
      updatePaypalEmail,
      form,
      validateProfile,
      notify,
      setEditMode,
      fetchUser
    } = this.props;

    return validateProfile(form.attributes)
    .then(({error}) => {
      if (error && error.message) {
        return notify('error', this.props.validationError);
      } else {
        return updatePaypalEmail(user.id, form.attributes.paypalEmail).then(errorify);
      }
    })
    .then(() => fetchUser(user.id)) // refresh email after saving
    .then(() => setEditMode(false))
    .catch(({message}) => notify('error', message));
  }

  cancel() {
    this.props.setEditMode(false);
  }

  componentWillMount() {
    this.props.fetchUser(this.props.userid);
  }
}

export default connect(mapStateToProps, {
  setEditMode,
  updatePaypalEmail,
  appendProfileForm,
  validateProfile,
  resetNotifications,
  fetchUser,
  notify
})(Profile);

function mapStateToProps({session, form, notification, users}) {
  const userid = session.user.id;

  return {
    userid,
    user: users[userid] || {},
    form: form.profile,
    isEditMode: form.profile.isEditMode,
    validationError: form.profile.error.message,
    saveInProgress: users.updateInProgress || false,
    notification
  };
}
