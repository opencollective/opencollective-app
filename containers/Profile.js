import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replaceState } from 'redux-router';
import values from 'lodash/object/values';
import Joi from 'joi';

import Content from './Content';

import TopBar from '../components/TopBar';
import Notification from '../components/Notification';
import ProfileFormDefault from '../components/ProfileFormDefault';
import ProfileFormEdit from '../components/ProfileFormEdit';

import validate from '../actions/form/validate_schema';

import updatePaypalEmail from '../actions/users/update_paypal_email';
import updateAvatar from '../actions/users/update_avatar';
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

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditMode: false
    };
    this.schema = Joi.object().keys({
      paypalEmail: Joi.string().email().label('PayPal account'),
      link: Joi.string().uri().label('Photo'),
    });
  }

  render() {
    return (
      <div className='Profile'>
        <TopBar title='Profile' hasBackButton={true} />
        <Content>
          <Notification {...this.props} />
          <div className='padded'>
            {this.state.isEditMode ?
              (
                <ProfileFormEdit {...this.props}
                  save={save.bind(this)}
                  cancel={cancel.bind(this)} />
              ) : (
                <ProfileFormDefault {...this.props}
                  logoutAndRedirect={logoutAndRedirect.bind(this)}
                  setEditMode={() => this.setEditMode(true)} />
              )
            }
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

  setEditMode(isEditMode) {
    this.setState({isEditMode});
  }
}

/**
 * Export methods for testing
 */

export function resetPassword(userid, password, passwordConfirmation) {
  const { updatePassword, notify } = this.props;

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
  this.setEditMode(false);
  this.props.resetNotifications();
};

export function save(profile) {
  const {
    user,
    updatePaypalEmail,
    updateAvatar,
    validate,
    notify,
    fetchUser
  } = this.props;

  const { paypalEmail, link } = profile;

  return validate(profile, this.schema)
    .then(() => {
      if (paypalEmail) return updatePaypalEmail(user.id, paypalEmail);
    })
    .then(() => {
      if (link) return updateAvatar(user.id, link)
    })
    .then(() => fetchUser(user.id)) // refresh email after saving
    .then(() => this.setEditMode(false))
    .catch(({message}) => notify('error', message));
  };

export default connect(mapStateToProps, {
  updatePaypalEmail,
  updateAvatar,
  validate,
  resetNotifications,
  fetchUser,
  notify,
  logout,
  replaceState,
  getPreapprovalDetails,
  fetchCards,
  getPreapprovalKey,
  fetchGroups,
  uploadImage
})(Profile);

function mapStateToProps({session, notification, users, images, form}) {
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
    user,
    saveInProgress: users.updateInProgress,
    hasPreapproved,
    isUploading: images.isUploading || false,
    groups: values(user.groups),
    error: form.schema.error
  };
}
