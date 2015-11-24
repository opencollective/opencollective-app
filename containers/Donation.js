import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

import rejectError from '../lib/reject_error';

import Content from './Content';

import Header from '../components/Header';
import Notification from '../components/Notification';
import DonationForm from '../components/DonationForm';

import validateTransaction from '../actions/form/validate_transaction';
import createTransaction from '../actions/transactions/create';
import appendDonationForm from '../actions/form/append_donation';
import setDonationCustom from '../actions/form/set_donation_custom';
import resetNotifications from '../actions/notification/reset';
import fetchGroup from '../actions/groups/fetch_by_id';
import fetchUser from '../actions/users/fetch_by_id';
import notify from '../actions/notification/notify';

export class Donation extends Component {
  render() {
    const backLink = `/groups/${this.props.groupid}/transactions/`;

    return (
      <div className='Donation'>
        <Header
          title='Add funds'
          backLink={backLink} />
        <Content>
          {this.notification(this.props)}
          <div className='padded'>
            <DonationForm {...this.props} donate={donate.bind(this)}/>
          </div>
        </Content>
      </div>
    );
  }

  componentWillMount() {
    this.props.fetchGroup(this.props.groupid);
    this.props.fetchUser(this.props.userid);
  }

  notification({notification, resetNotifications}) {
    return (
      <Notification
        {...notification}
        resetNotifications={resetNotifications} />
    );
  }
}

export function donate() {
  const {
    validateTransaction,
    createTransaction,
    groupid,
    amount,
    group,
    user,
    notify,
    pushState,
    description
  } = this.props;

  const transaction = {
    amount,
    description: description || `Donation from ${user.email} to ${group.name}`,
    tags: ['Donation'],
    approvedAt: Date.now(),
    approved: true,
    createdAt: Date.now()
  };

  return validateTransaction(transaction)
  .then(rejectError.bind(this, 'validationError'))
  .then(() => createTransaction(groupid, transaction))
  .then(rejectError.bind(this, 'serverError'))
  .then(() => pushState(null, `/groups/${groupid}/transactions`))
  .catch(error => notify('error', error.message));
}

export default connect(mapStateToProps, {
  resetNotifications,
  fetchGroup,
  setDonationCustom,
  fetchUser,
  createTransaction,
  validateTransaction,
  notify,
  pushState,
  appendDonationForm
})(Donation);

function mapStateToProps({router, groups, form, session, users, transactions, notification}) {
  const groupid = router.params.groupid;
  const userid = session.user.id;

  return {
    groupid,
    userid,
    notification,
    form,
    transactions,
    isCustomMode: form.donation.isCustomMode,
    description: form.donation.attributes.description,
    amount: form.donation.attributes.amount,
    group: groups[groupid] || {},
    user: users[userid] || {},
    validationError: form.transaction.error,
    serverError: transactions.error
  };
}
