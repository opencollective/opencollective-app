import React, { Component } from 'react';
import { connect } from 'react-redux';

import Content from './Content';

import Header from '../components/Header';
import Notification from '../components/Notification';
import DonationForm from '../components/DonationForm';

import validateTransaction from '../actions/form/validate_transaction';
import createTransaction from '../actions/transactions/create';
import setDonationAmount from '../actions/form/set_donation_amount';
import setDonationCustom from '../actions/form/set_donation_custom';
import resetNotifications from '../actions/notification/reset';
import fetchGroup from '../actions/groups/fetch_by_id';
import fetchUser from '../actions/users/fetch_by_id';
import notify from '../actions/notification/notify';

export class Donation extends Component {
  render() {
    return (
      <div className='Donation'>
        <Header title='Donate' hasBackButton={true} />
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
    notify
  } = this.props;

  const transaction = {
    amount,
    description: `Donation from ${user.email} to ${group.name}`,
    tags: ['Donation'],
    createdAt: Date.now()
  };

  return validateTransaction(transaction)
  .then(rejectValidationError.bind(this))
  .then(() => createTransaction(groupid, transaction))
  .then(rejectServerError.bind(this))
  .catch(error => notify('error', error.message));
}

function rejectServerError() {
  const error = this.props.serverError; // server side error
  return error && error.message ? Promise.reject(error) : Promise.resolve();
}

function rejectValidationError() {
  const error = this.props.clientError; // validation erro
  return error && error.message ? Promise.reject(error) : Promise.resolve();
}

export default connect(mapStateToProps, {
  resetNotifications,
  fetchGroup,
  setDonationAmount,
  setDonationCustom,
  fetchUser,
  createTransaction,
  validateTransaction,
  notify
})(Donation);

function mapStateToProps({router, groups, form, session, users, transactions, notification}) {
  const groupid = router.params.groupid;
  const userid = session.user.id;

  return {
    groupid,
    group: groups[groupid] || {},
    amount: form.donation.amount,
    isCustomMode: form.donation.isCustomMode,
    userid,
    notification,
    user: users[userid] || {},
    form,
    transactions,
    serverError: transactions.error,
    clientError: form.transaction.error
  };
}
