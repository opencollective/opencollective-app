import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replaceState } from 'redux-router';
import values from 'lodash/object/values';

import Content from './Content';
import TopBar from '../components/TopBar';
import ProfileForm from '../components/ProfileForm';
import Notification from '../components/Notification';
import setEditMode from '../actions/form/set_edit_mode_profile';
import appendProfileForm from '../actions/form/append_profile';
import validateProfile from '../actions/form/validate_profile';

import updatePaypalEmail from '../actions/users/update_paypal_email';
import updateAvatar from '../actions/users/update_avatar';
import updatePassword from '../actions/users/update_password';
import fetchUser from '../actions/users/fetch_by_id';
import fetchCards from '../actions/users/fetch_cards';
import fetchGroups from '../actions/users/fetch_groups';
import uploadImage from '../actions/images/upload';
import getPreapprovalDetails from '../actions/users/get_preapproval_details';
import getPreapprovalKey from '../actions/users/get_preapproval_key';
import notify from '../actions/notification/notify';
import resetNotifications from '../actions/notification/reset';
import logout from '../actions/session/logout';
import { getPaypalCard } from '../reducers/users';

// Use named export for unconnected component (for tests)
// http://rackt.org/redux/docs/recipes/WritingTests.html
export class Profile extends Component {
  render() {
    return (
      <div className='Profile'>
        <TopBar title='Profile' hasBackButton={true} />
        <Content>
          <Notification {...this.props} />
          <div className='padded'>
            <ProfileForm
              {...this.props}
              logoutAndRedirect={logoutAndRedirect.bind(this)}
              save={save.bind(this)}
              cancel={cancel.bind(this)} />
          </div>
        </Content>
      </div>
    );
  }

  componentWillMount() {
    const {
      userid,
      fetchUser,
      fetchGroups
    } = this.props;

    fetchUser(userid);
    getPreapprovalInfo.call(this);
    fetchGroups(userid, {stripe: true});
  }
}

/**
 * Export methods for testing
 */

export function resetPassword(userid, password, passwordConfirmation) {
  const { updatePassword, notify } = this.props;

  if (password !== passwordConfirmation) {
    throw new Error('Passwords are not matching');
  }

  return updatePassword(userid, password, passwordConfirmation)
  .then(() => notify('success', 'Reset password successful'));
};

export function getPreapprovalInfo() {
  const { userid, getPreapprovalDetails, fetchCards } = this.props;

  return fetchCards(userid, { service: 'paypal' })
  .then(() => {
    const card = this.props.card;

    if (card && card.token) {
      return getPreapprovalDetails(userid, card.token);
    }
  });
};

export function logoutAndRedirect() {
  this.props.logout();
  this.props.replaceState(null, '/app/login');
};

export function cancel() {
  this.props.setEditMode(false);
};

export function save() {
  const {
    user,
    updatePaypalEmail,
    updateAvatar,
    form,
    validateProfile,
    notify,
    setEditMode,
    fetchUser
  } = this.props;

  const { paypalEmail, link, password, passwordConfirmation } = form.attributes;

  return validateProfile(form.attributes)
  .then(() => {
    if (paypalEmail) {
      return updatePaypalEmail(user.id, paypalEmail)
    }
  })
  .then(() => {
    if (link) {
      return updateAvatar(user.id, link)
    }
  })
  .then(() => {
    if (password && passwordConfirmation) {
      return resetPassword.call(this, user.id, password, passwordConfirmation);
    }
  })
  .then(() => fetchUser(user.id)) // refresh email after saving
  .then(() => setEditMode(false))
  .catch(({message}) => notify('error', message));
};

export default connect(mapStateToProps, {
  setEditMode,
  updatePaypalEmail,
  updateAvatar,
  appendProfileForm,
  validateProfile,
  resetNotifications,
  fetchUser,
  notify,
  logout,
  replaceState,
  getPreapprovalDetails,
  fetchCards,
  getPreapprovalKey,
  fetchGroups,
  uploadImage,
  updatePassword
})(Profile);

function mapStateToProps({session, form, notification, users, images}) {
  const userid = session.user.id;
  const user = users[userid] || {};
  const card = getPaypalCard(users, userid);
  const preapprovalDetails = users.preapprovalDetails || {};
  const hasPreapproved = !!preapprovalDetails.maxTotalAmountOfAllPayments;

  return {
    userid,
    notification,
    card,
    preapprovalDetails,
    form: form.profile,
    user,
    isEditMode: form.profile.isEditMode,
    saveInProgress: users.updateInProgress,
    hasPreapproved,
    isUploading: images.isUploading || false,
    groups: values(user.groups)
  };
}
