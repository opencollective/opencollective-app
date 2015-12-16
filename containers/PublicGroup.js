import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import BodyClassName from 'react-body-classname';

import rejectError from '../lib/reject_error';
import convertToCents from '../lib/convert_to_cents';
import filterCollection from '../lib/filter_collection';
import sortByDate from '../lib/sort_by_date';

import PublicHeader from '../components/PublicHeader';
import Notification from '../components/Notification';
import PublicGroupForm from '../components/PublicGroupForm';
import PublicGroupThanks from '../components/PublicGroupThanks';
import PublicGroupHeader from '../components/PublicGroupHeader';
import TransactionsList from '../components/TransactionsList';
import SubTitle from '../components/SubTitle';
import UsersList from '../components/UsersList';
import Currency from '../components/Currency';

import appendDonationForm from '../actions/form/append_donation';
import setDonationCustom from '../actions/form/set_donation_custom';
import fetchGroup from '../actions/groups/fetch_by_id';
import fetchUsers from '../actions/users/fetch_by_group';
import fetchTransactions from '../actions/transactions/fetch_by_group';
import donate from '../actions/groups/donate';
import notify from '../actions/notification/notify';
import resetNotifications from '../actions/notification/reset';

export class PublicGroup extends Component {
  render() {
    return (
      <BodyClassName className='Public'>
        <div className='PublicGroup'>
          <PublicHeader />
          <Notification {...this.props} />
          <div className='PublicGroup-container'>
            <PublicGroupHeader {...this.props.group} />
            <UsersList users={this.props.backers} size='75px' />
            <div className='Well PublicGroup-well'>
              <span className='Well-primary'>
                Available budget
              </span>
              <span className='Well-right'>
                <Currency value={this.props.group.balance} />
              </span>
            </div>
            <div className='PublicGroup-transactions'>
              <SubTitle text='Latest transactions' />
              <TransactionsList {...this.props} />
            </div>
            {this.form(this.props)}
          </div>
        </div>
      </BodyClassName>
    );
  }

  componentWillMount() {
    const {
      fetchGroup,
      groupid,
      fetchTransactions,
      fetchUsers
    } = this.props;

    fetchGroup(groupid);
    fetchTransactions(groupid, { per_page: 5 });
    fetchUsers(groupid);
  }

  form(props) {
    if (props.showThankYouPage) {
      return <PublicGroupThanks />;
    } else {
      const onToken = donateToGroup.bind(this, props.amount);

      return <PublicGroupForm {...props} onToken={onToken} />
    }
  }
}

export function donateToGroup(amount, token) {
  const {
    groupid,
    notify,
    donate,
    pushState
  } = this.props;

  const payment = {
    stripeToken: token.id,
    email: token.email,
    amount
  };

  return donate(groupid, payment)
  .then(rejectError.bind(this))
  .then(() => pushState(null, `/public/groups/${groupid}/?status=thankyou`))
  .catch(error => notify('error', error.message));
}

export default connect(mapStateToProps, {
  fetchGroup,
  appendDonationForm,
  setDonationCustom,
  donate,
  notify,
  resetNotifications,
  pushState,
  fetchTransactions,
  fetchUsers
})(PublicGroup);

function mapStateToProps({
  router,
  groups,
  form,
  notification,
  transactions,
  users
}) {
  const groupid = router.params.groupid;
  const status = router.location.query.status;
  const amount = form.donation.attributes.amount || 0;
  const group = groups[groupid] || { stripeManagedAccount: {} };
  const GroupId = Number(groupid);

  return {
    groupid,
    group,
    stripeKey: group.stripeManagedAccount.stripeKey,
    amount,
    stripeAmount: convertToCents(amount),
    isCustomMode: form.donation.isCustomMode,
    notification,
    inProgress: groups.donateInProgress,
    showThankYouPage: status === 'thankyou',
    transactions: filterCollection(transactions, { GroupId }).sort(sortByDate),
    users,
    backers: filterCollection(users, { GroupId }),
  };
}
