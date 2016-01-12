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
  
    GroupVideoOrImage(group) {
    if(group.video) {
      return (
        <div className='PublicGroup-video'>
          <YoutubeVideo id={group.video} />
        </div>
      );
    }
    else {
      return (
        <div className='PublicGroup-image'>
          <img src={group.image} />
        </div>
      );
    }
  }
  
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
      members
    } = this.props;

    const logoStyle = {
      backgroundImage: 'url(' + group.logo + ')'
    };
    
    return (
      <BodyClassName className='Public'>
        <div className='PublicGroup'>

          <PublicHeader />
          <Notification {...this.props} />

          <div className='PublicContent'>

            <div className='u-py2 u-center'>
              <div className='GroupLogo' style={logoStyle}>
              </div>
              <div className='PublicGroup-motto'>
                {group.description}
              </div>
            </div>

            <div className='PublicGroup-summary'>
              {this.GroupVideoOrImage(group)}
              <div className='PublicGroup-metricContainer'>
                <Metric label='Share'>
                  <ShareIcon type='twitter' url={shareUrl} name={group.name} description={group.description} />
                  <ShareIcon type='facebook' url={shareUrl} name={group.name} description={group.description} />
                  <ShareIcon type='mail' url={shareUrl} name={group.name} description={group.description} />
                </Metric>
                <Metric
                  label='Funds Raised'
                  value={formatCurrency(group.donationTotal, group.currency)} />
                <Metric
                  label='Backers'
                  value={group.backersCount} />
                <a className='Button Button--green PublicGroup-support' href='#support'>
                  Back us
                </a>
              </div>
            </div>

            <div className='PublicGroup-title Subtitle'>Our collective</div>
            <div className='PublicGroup-quote'>
              <div className='PublicGroup-members'>
                <UsersList users={members} size='75px'/>
              </div>
              <div className='PublicGroup-quoteText'>
                {group.longDescription}
              </div>
            </div>

            <div className='PublicGroup-title Subtitle'>Backers</div>
            <UsersList users={backers} size='111px'/>

            <div className='u-mb2'>
              <div className='PublicGroup-expenses'>
                <div className='PublicGroup-title Subtitle'>Expenses</div>
                {(expenses.length === 0) && (
                <div className='PublicGroup-emptyState'>
                    <div className='PublicGroup-expenseIcon'>
                      <Icon type='expense' />
                    </div>
                    <label>    
                      All your approved expenses will show up here
                    </label>
                  </div>
                )}
                {expenses.map(expense => <TransactionItem
                                            key={expense.id}
                                            transaction={expense}
                                            user={users[expense.UserId]} />)}
              </div>
              <div className='PublicGroup-donations'>
                <div className='PublicGroup-title Subtitle'>Revenue</div>
                {(donations.length === 0) && (
                  <div className='PublicGroup-emptyState'>
                    <div className='PublicGroup-donationIcon'>
                      <Icon type='revenue' />
                    </div>
                    <label>
                      All your latest donations will show up here
                    </label>
                  </div>
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

  const hosts = filterCollection(users, { role: 'admin' });
  const members = filterCollection(users, { role: 'writer' });
  const backers = filterCollection(users, { role: 'viewer' });

  const groupTransactions = filterCollection(transactions, { GroupId });

  const donations = groupTransactions.filter(({amount}) => amount > 0);
  const expenses = groupTransactions.filter(({amount}) => amount < 0);

  // const backers = donations.map(t => users[t.UserId]).filter(t => !!t);

  return {
    groupid,
    group,
    notification,
    users,
    backers: uniq(backers, 'id'),
    host: hosts[0] || {},
    members,
    donations: take(donations, 2),
    expenses: take(expenses, 2),
    interval: form.donation.attributes.interval,
    amount: form.donation.attributes.amount,
    stripeAmount: convertToCents(form.donation.attributes.amount),
    stripeKey: '', // group.stripeManagedAccount.stripeKey, // Waiting for fix for Stripe
    isCustomMode: form.donation.isCustomMode,
    inProgress: groups.donateInProgress,
    showThankYouPage: status === 'thankyou',
    shareUrl: window.location.href
  };
}
