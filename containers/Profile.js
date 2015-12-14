import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replaceState } from 'redux-router';

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
import fetchCards from '../actions/users/fetch_cards';
import getPreapprovalDetails from '../actions/users/get_preapproval_details';
import getPreapprovalKey from '../actions/users/get_preapproval_key';
import notify from '../actions/notification/notify';
import resetNotifications from '../actions/notification/reset';
import logout from '../actions/session/logout';
import { getPaypalCard } from '../reducers/users';
import rejectError from '../lib/reject_error';

// Use named export for unconnected component (for tests)
// http://rackt.org/redux/docs/recipes/WritingTests.html
export class Profile extends Component {
  render() {
    return (
      <div className='Profile'>
        <Header title='Profile' hasBackButton={true} />
        <Content>
          <Notification {...this.props} />
          <div className='padded'>
            <ProfileHeader {...this.props.user} />
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
    this.props.fetchUser(this.props.userid);
    getPreapprovalInfo.call(this);
  }
}

/**
 * Export methods for testing
 */

export function getPreapprovalInfo() {
  const { userid, getPreapprovalDetails, fetchCards } = this.props;

  fetchCards(userid, { service: 'paypal' })
  .then(() => {
    const card = this.props.card;

    if (card && card.token) {
      getPreapprovalDetails(userid, card.token)
    }
  });
};

export function logoutAndRedirect() {
  this.props.logout();
  this.props.replaceState(null, '/login');
};

export function cancel() {
  this.props.setEditMode(false);
};

export function save() {
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
  .then(rejectError.bind(this, 'validationError'))
  .then(() => updatePaypalEmail(user.id, form.attributes.paypalEmail))
  .then(rejectError.bind(this, 'serverError'))
  .then(() => fetchUser(user.id)) // refresh email after saving
  .then(() => setEditMode(false))
  .catch(({message}) => notify('error', message));
};

export default connect(mapStateToProps, {
  setEditMode,
  updatePaypalEmail,
  appendProfileForm,
  validateProfile,
  resetNotifications,
  fetchUser,
  notify,
  logout,
  replaceState,
  getPreapprovalDetails,
  fetchCards,
  getPreapprovalKey
})(Profile);

function mapStateToProps({session, form, notification, users}) {
  const userid = session.user.id;
  const card = getPaypalCard(users, userid);
  const preapprovalDetails = users.preapprovalDetails || {};
  const hasPreapproved = !!preapprovalDetails.maxTotalAmountOfAllPayments;

  return {
    userid,
    notification,
    card,
    preapprovalDetails,
    form: form.profile,
    user: users[userid] || {},
    isEditMode: form.profile.isEditMode,
    saveInProgress: users.updateInProgress,
    validationError: form.profile.error,
    serverError: users.error,
    hasPreapproved
  };
}
