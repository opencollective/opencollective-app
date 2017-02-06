import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

import formatCurrency from '../lib/format_currency';

import { getPaypalCard } from '../reducers/users';

import Content from './Content';

import TopBar from '../components/TopBar';
import Notification from '../components/Notification';
import Input from '../components/Input';
import SubmitButton from '../components/SubmitButton';
import PaypalReminder from '../components/PaypalReminder';

import validateFund from '../actions/form/validate_fund';
import createTransaction from '../actions/transactions/create';
import resetNotifications from '../actions/notification/reset';
import fetchGroup from '../actions/groups/fetch_by_id';
import fetchCards from '../actions/users/fetch_cards';
import notify from '../actions/notification/notify';
import getPreapprovalKeyForUser from '../actions/users/get_preapproval_key';

export class AddFund extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      description: ''
    };
  }

  render() {
    const { group, hasPaypalCard } = this.props;

    return (
      <div className='AddFund'>
        <TopBar
          title={`Add funds to ${group.name}`}
          backLink={`/groups/${this.props.groupid}/transactions/`} />
        <Content>
          <Notification {...this.props} />
          <div className='padded'>
            {hasPaypalCard ? this.form() : this.paypalReminder()}
          </div>
        </Content>
      </div>
    );
  }

  componentWillMount() {
    const {
      fetchGroup,
      fetchCards,
      notify,
      userid,
      groupid
    } = this.props;

    Promise.all([
      fetchGroup(groupid),
      fetchCards(userid, { service: 'paypal'})
    ])
    .catch(({message}) => notify('error', message));
  }

  form() {
    return (
      <div>
        <form onSubmit={event => {
          event.preventDefault();
          addFund.call(this);
        }}>
          <label>Amount:</label>
          <Input
            value={this.state.amount}
            customClass='js-amount' // for tests
            placeholder={formatCurrency(0, this.props.group.currency)}
            handleChange={amount => this.setState({amount})} />

          <label>Description:</label>
          <Input
            value={this.state.description}
            customClass='js-description' // for tests
            placeholder='Description'
            handleChange={description => this.setState({description})} />

          <div className='AddFund-buttonContainer'>
            <SubmitButton />
          </div>
          <p className='AddFund-info'>
            Don't worry, no money will be moved when you add funds. We only transfer money when you explicitly approve an expense.
          </p>
        </form>
      </div>
    );
  }

  paypalReminder() {
    const { getPreapprovalKeyForUser, userid, preapprovalInProgress } = this.props;

    return (
      <PaypalReminder
        getPreapprovalKey={() => getPreapprovalKeyForUser(userid)}
        inProgress={preapprovalInProgress} />
    );

  }

}

export function addFund() {

  const {
    validateFund,
    createTransaction,
    groupid,
    notify,
    pushState,
  } = this.props;

  const transaction = {
    amount: this.state.amount*100,
    description: this.state.description,
    tags: ['Fund'],
    createdAt: Date.now(),
  };

  return validateFund(transaction)
  .then(() => createTransaction(groupid, transaction))
  .then(() => pushState(null, `/groups/${groupid}/transactions`))
  .then(() => notify('success', 'Funds added'))
  .catch(({message}) => notify('error', message));
}

export default connect(mapStateToProps, {
  resetNotifications,
  fetchGroup,
  fetchCards,
  createTransaction,
  validateFund,
  getPreapprovalKeyForUser,
  notify,
  pushState,
})(AddFund);

function mapStateToProps({router, groups, session, users, notification}) {
  const groupid = router.params.groupid;
  const userid = session.user.id;
  const paypalCard = getPaypalCard(users, userid);

  return {
    groupid,
    group: groups[groupid] || {},
    userid,
    preapprovalInProgress: users.inProgress,
    user: users[userid] || {},
    notification,
    hasPaypalCard: paypalCard && paypalCard.id
  };
}
