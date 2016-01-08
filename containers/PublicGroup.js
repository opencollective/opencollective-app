import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { Link } from 'react-router';
import BodyClassName from 'react-body-classname';
import take from 'lodash/array/take';
import contains from 'lodash/collection/contains';

import rejectError from '../lib/reject_error';
import convertToCents from '../lib/convert_to_cents';
import filterCollection from '../lib/filter_collection';
import sortByDate from '../lib/sort_by_date';
import sortByAmount from '../lib/sort_by_amount';
import formatCurrency from '../lib/format_currency';

import PublicHeader from '../components/PublicHeader';
import Notification from '../components/Notification';
import PublicFooter from '../components/PublicFooter';
import PublicGroupForm from '../components/PublicGroupForm';
import PublicGroupThanks from '../components/PublicGroupThanks';
import TransactionsList from '../components/TransactionsList';
import YoutubeVideo from '../components/YoutubeVideo';
import Avatar from '../components/Avatar';
import Metric from '../components/Metric';
import UsersList from '../components/UsersList';

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
    const {
      group,
      showThankYouPage,
      amount,
      backers,
      topDonations,
      donations,
      expenses
    } = this.props;

    return (
      <BodyClassName className='Public'>
        <div className='PublicGroup'>

          <PublicHeader />
          <Notification {...this.props} />

          <div className='PublicContent'>

            <div className='u-py2 u-center'>
              <img src='/images/LogoLargeTransparent.png' className='PublicGroup-logo' />
              <div className='u-mb1'>
                In order to reach our goals, {group.name} needs your help
              </div>
            </div>

            <div className='PublicGroup-summary'>
              <div className='PublicGroup-video'>
                <YoutubeVideo id='Z6ih1aKeETk' />
              </div>
              <div className='PublicGroup-metricContainer'>
                <Metric
                  label='Funds Raised'
                  value={formatCurrency(group.donationTotal, group.currency)} />
                <Metric
                  label='Supporters'
                  value={group.backersCount} />
                <a className='Button Button--green' href='#support'>
                  Support us
                </a>
              </div>
            </div>

            <div className='PublicGroup-title'>Our collective</div>
            <div className='PublicGroup-quote'>
              <div className='PublicGroup-quoteUser'>
                <Avatar />
                <span className='PublicGroup-quoteName'>
                  <b>Dayra</b> <br/>
                  Women Who Code <br/>
                  Mexico City Director <br/>
                </span>
              </div>
              <div className='PublicGroup-quoteText'>
                The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee.
              </div>
            </div>

            <div className='PublicGroup-title'>Supporter Showcase</div>
            <UsersList users={backers} />

            <div className='u-mb2'>
              <div className='PublicGroup-expenses'>
                <div className='PublicGroup-title'>Expenses</div>
                <TransactionsList {...this.props} transactions={expenses} />
              </div>
              <div className='PublicGroup-donations'>
                <div className='PublicGroup-title'>Raised</div>
                <TransactionsList {...this.props} transactions={donations}/>
              </div>
            </div>

            <div id='support'></div>
            {showThankYouPage ?
              <PublicGroupThanks /> : (
              <PublicGroupForm {...this.props} onToken={donateToGroup.bind(this, amount)} />
            )}

          </div>
          <PublicFooter />
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

    fetchTransactions(groupid, {
      per_page: 1,
      sort: 'amount',
      direction: 'asc'
    })
    .then(({transactions}) => transactions.map(fetchUserIfNeeded));

    fetchTransactions(groupid, {
      per_page: 1,
      sort: 'amount',
      direction: 'desc'
    })
    .then(({transactions}) => transactions.map(fetchUserIfNeeded));

    fetchUsers(groupid);
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
  const top5 = take(topDonations,1);

  const backers = top5.map(t => users[t.UserId]).filter(t => !!t);

  const donations = groupTransactions.filter(({amount}) => amount > 0);
  const expenses = groupTransactions.filter(({amount}) => amount < 0);

  return {
    groupid,
    group,
    isPublic: true,
    stripeKey: group.stripeManagedAccount.stripeKey,
    amount,
    interval: form.donation.attributes.interval,
    stripeAmount: convertToCents(amount),
    isCustomMode: form.donation.isCustomMode,
    notification,
    inProgress: groups.donateInProgress,
    showThankYouPage: status === 'thankyou',
    transactions: take(groupTransactions.sort(sortByDate), 1),
    users,
    backers,
    admins,
    donations,
    expenses
  };
}
