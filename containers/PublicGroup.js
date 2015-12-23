import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { Link } from 'react-router';
import BodyClassName from 'react-body-classname';
import take from 'lodash/array/take';
import extend from 'lodash/object/extend';
import contains from 'lodash/collection/contains';

import rejectError from '../lib/reject_error';
import convertToCents from '../lib/convert_to_cents';
import filterCollection from '../lib/filter_collection';
import sortByDate from '../lib/sort_by_date';
import sortByAmount from '../lib/sort_by_amount';

import PublicHeader from '../components/PublicHeader';
import Notification from '../components/Notification';
import PublicGroupForm from '../components/PublicGroupForm';
import PublicGroupThanks from '../components/PublicGroupThanks';
import TransactionsList from '../components/TransactionsList';
import SubTitle from '../components/SubTitle';
import UsersList from '../components/UsersList';
import Currency from '../components/Currency';

import appendDonationForm from '../actions/form/append_donation';
import setDonationCustom from '../actions/form/set_donation_custom';
import fetchGroup from '../actions/groups/fetch_by_id';
import fetchUsers from '../actions/users/fetch_by_group';
import fetchUserIfNeeded from '../actions/users/fetch_by_id_cached';
import fetchTransactions from '../actions/transactions/fetch_by_group';
import donate from '../actions/groups/donate';
import notify from '../actions/notification/notify';
import resetNotifications from '../actions/notification/reset';
import getUniqueValues from '../lib/get_unique_values';

export class PublicGroup extends Component {
  render() {
    const { group } = this.props;

    return (
      <BodyClassName className='Public'>
        <div className='PublicGroup'>

          <PublicHeader />
          <Notification {...this.props} />

          <div className='PublicGroup-container'>

            <div className='u-center u-py1'>
              <div className='u-bold u-py1'>{group.name}</div>
              <div className='u-mb1'>
                In order to reach our goals, {group.name} needs your help
              </div>
            </div>

            <UsersList users={this.props.admins} size='75px' />

            <div className='Well PublicGroup-well'>
              <span className='Well-primary'>
                Available budget
              </span>
              <span className='Well-right'>
                <Currency value={group.balance} />
              </span>
            </div>

            <div className='u-mt1 PublicGroup-backers'>
              <SubTitle text='Our backers' />
              <UsersList users={this.props.backers} />
            </div>

            {this.form(this.props)}

            <div className='u-mt1 u-mb2 PublicGroup-transactions'>
              <Link to={`/groups/${this.props.groupid}/transactions`}>
                <div className='u-py05 u-borderBottom u-darkGray u-bold'>
                  Latest transactions <span className='PublicGroup-tick'>></span>
                </div>
              </Link>
              <TransactionsList {...this.props} />
            </div>
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
      fetchUsers,
      fetchUserIfNeeded
    } = this.props;

    fetchGroup(groupid);
    fetchTransactions(groupid, { per_page: 5 });
    fetchTransactions(groupid, {
      sort: 'amount',
      direction: 'desc'
    })
    .then(({transactions}) => {
      return getUniqueValues(transactions, 'UserId').map(fetchUserIfNeeded);
    });

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
    pushState,
    interval
  } = this.props;

  const payment = {
    stripeToken: token.id,
    email: token.email,
    amount
  };

  if (contains(['month', 'year'], interval)) {
    payment.interval = interval;
  }

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
  fetchUsers,
  fetchUserIfNeeded
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

  const groupTransactions = filterCollection(transactions, { GroupId });
  const admins = filterCollection(users, { GroupId });
  const topDonations = groupTransactions.sort(sortByAmount).filter(t => t.amount > 0)
  const top5 = take(topDonations, 5);

  const backers = top5.map(t => extend({}, users[t.UserId], {amount: t.amount}));

  return {
    groupid,
    group,
    stripeKey: group.stripeManagedAccount.stripeKey,
    amount,
    interval: form.donation.attributes.interval,
    stripeAmount: convertToCents(amount),
    isCustomMode: form.donation.isCustomMode,
    notification,
    inProgress: groups.donateInProgress,
    showThankYouPage: status === 'thankyou',
    transactions: take(groupTransactions.sort(sortByDate), 3),
    users,
    backers,
    admins
  };
}
