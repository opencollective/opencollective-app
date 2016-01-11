import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import BodyClassName from 'react-body-classname';
import take from 'lodash/array/take';
import contains from 'lodash/collection/contains';
import uniq from 'lodash/array/uniq';

import convertToCents from '../lib/convert_to_cents';
import filterCollection from '../lib/filter_collection';
import formatCurrency from '../lib/format_currency';

import PublicHeader from '../components/PublicHeader';
import Notification from '../components/Notification';
import PublicFooter from '../components/PublicFooter';
import PublicGroupForm from '../components/PublicGroupForm';
import PublicGroupThanks from '../components/PublicGroupThanks';
import TransactionItem from '../components/TransactionItem';
import YoutubeVideo from '../components/YoutubeVideo';
import ProfilePhoto from '../components/ProfilePhoto';
import Metric from '../components/Metric';
import UsersList from '../components/UsersList';
import ShareIcon from '../components/ShareIcon';
import Icon from '../components/Icon';

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
    const {
      group,
      showThankYouPage,
      amount,
      backers,
      donations,
      expenses,
      shareUrl,
      users,
      admin
    } = this.props;

    return (
      <BodyClassName className='Public'>
        <div className='PublicGroup'>

          <PublicHeader />
          <Notification {...this.props} />

          <div className='PublicContent'>

            <div className='u-py2 u-center'>
              <img src={group.logo} className='PublicGroup-logo' />
              <div className='PublicGroup-motto'>
                {group.description}
              </div>
            </div>

            <div className='PublicGroup-summary'>
              <div className='PublicGroup-video'>
                <YoutubeVideo id={group.video} />
              </div>
              <div className='PublicGroup-metricContainer'>
                <Metric label='Share'>
                  <ShareIcon type='twitter' url={shareUrl} />
                  <ShareIcon type='facebook' url={shareUrl} />
                  <ShareIcon type='mail' url={shareUrl} />
                </Metric>
                <Metric
                  label='Funds Raised'
                  value={formatCurrency(group.donationTotal, group.currency)} />
                <Metric
                  label='Supporters'
                  value={group.backersCount} />
                <a className='Button Button--green PublicGroup-support' href='#support'>
                  Support us
                </a>
              </div>
            </div>

            <div className='PublicGroup-title'>Our collective</div>
            <div className='PublicGroup-quote'>
              <div className='PublicGroup-quoteUser'>
                <ProfilePhoto
                  hasBorder={true}
                  url={admin.avatar}
                  size='75px' />
                <span className='PublicGroup-quoteName'>
                  <b>{admin.name}</b> <br/>
                  {admin.description}
                </span>
              </div>
              <div className='PublicGroup-quoteText'>
                {group.longDescription}
              </div>
            </div>

            <div className='PublicGroup-title'>Supporter Showcase</div>
            <UsersList users={backers} size='111px'/>

            <div className='u-mb2'>
              <div className='PublicGroup-expenses'>
                <div className='PublicGroup-title'>Expenses</div>
                {(expenses.length === 0) && (
                  <span>
                    <span className='PublicGroup-expenseIcon'>
                      <Icon type='expense' />
                    </span>
                    <span className='PublicGroup-emptyExpense'>
                      Transactions added to the collective will be displayed here
                    </span>
                  </span>
                )}
                {expenses.map(expense => <TransactionItem
                                            key={expense.id}
                                            transaction={expense}
                                            user={users[expense.UserId]} />)}
              </div>
              <div className='PublicGroup-donations'>
                <div className='PublicGroup-title'>Raised</div>
                {(donations.length === 0) && (
                  <span>
                    <span className='PublicGroup-donationIcon'>
                      <Icon type='user' />
                    </span>
                    <span className='PublicGroup-emptyDonation'>
                      All your latest member activity will show up here
                    </span>
                  </span>
                )}
                {donations.map(donation => <TransactionItem
                                              key={donation.id}
                                              transaction={donation}
                                              user={users[donation.UserId]} />)}
              </div>
            </div>

            <div id='support'></div>
            {
              showThankYouPage ?
              <PublicGroupThanks /> :
              <PublicGroupForm {...this.props} onToken={donateToGroup.bind(this, amount)} />
            }

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
      fetchUsers
    } = this.props;

    fetchGroup(groupid);

    fetchTransactions(groupid, {
      per_page: 2,
      sort: 'createdAt',
      direction: 'desc',
      donation: true
    });

    fetchTransactions(groupid, {
      per_page: 2,
      sort: 'createdAt',
      direction: 'desc',
      expense: true
    });

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
  .then(() => pushState(null, `/public/groups/${groupid}/?status=thankyou`))
  .catch(({message}) => notify('error', message));
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
  // Major hack!
  const isYeoman = contains(router.location.pathname, 'yeoman');
  const groupid = isYeoman ? '8' : router.params.groupid;

  const status = router.location.query.status;
  const group = groups[groupid] || { stripeManagedAccount: {} };
  const GroupId = Number(groupid);

  const admins = filterCollection(users, { GroupId });
  const groupTransactions = filterCollection(transactions, { GroupId });

  const donations = groupTransactions.filter(({amount}) => amount > 0);
  const expenses = groupTransactions.filter(({amount}) => amount < 0);

  const backers = donations.map(t => users[t.UserId]).filter(t => !!t);

  return {
    groupid,
    group,
    notification,
    users,
    backers: uniq(backers, 'id'),
    admin: admins[0] || {},
    donations: take(donations, 2),
    expenses: take(expenses, 2),
    interval: form.donation.attributes.interval,
    amount: form.donation.attributes.amount,
    stripeAmount: convertToCents(form.donation.attributes.amount),
    stripeKey: group.stripeManagedAccount.stripeKey,
    isCustomMode: form.donation.isCustomMode,
    inProgress: groups.donateInProgress,
    showThankYouPage: status === 'thankyou',
    shareUrl: window.location.href
  };
}
