import React, { Component } from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import BodyClassName from 'react-body-classname';

import rejectError from '../lib/reject_error';
import convertToCents from '../lib/convert_to_cents';

import PublicHeader from '../components/PublicHeader';
import PublicGroupHeader from '../components/PublicGroupHeader';
import DonationPicker from '../components/DonationPicker';
import SubTitle from '../components/SubTitle';
import Notification from '../components/Notification';
import AsyncButton from '../components/AsyncButton';

import appendDonationForm from '../actions/form/append_donation';
import setDonationCustom from '../actions/form/set_donation_custom';
import fetchGroup from '../actions/groups/fetch_by_id';
import donate from '../actions/groups/donate';
import notify from '../actions/notification/notify';
import resetNotifications from '../actions/notification/reset';

export class PublicGroup extends Component {
  render() {
    const {
      group,
      amount,
      stripeAmount,
      isCustomMode,
      setDonationCustom,
      appendDonationForm,
      notification,
      resetNotifications,
      inProgress
    } = this.props;

    return (
      <BodyClassName className='Public'>
        <div className='PublicGroup'>
          <PublicHeader />
          <Notification
            {...notification}
            resetNotifications={resetNotifications} />
          <div className='PublicGroup-container'>
            <PublicGroupHeader {...group} />
            <SubTitle text='Make your donation' />
            <DonationPicker
              setDonationAmount={amount => appendDonationForm({amount})}
              selected={amount}
              isCustomMode={isCustomMode}
              setDonationCustom={setDonationCustom} />

            <StripeCheckout
              token={donateToGroup.bind(this, stripeAmount)}
              stripeKey={window.__env.stripePublicKey} // Next level config
              name={group.name}
              amount={stripeAmount}
              description={group.description}>
              <div className='PublicGroup-buttonContainer'>
                <AsyncButton
                  color='green'
                  inProgress={inProgress} >
                  Donate
                </AsyncButton>
              </div>
            </StripeCheckout>
            <div className='PublicGroup-footer'></div>
          </div>
        </div>
      </BodyClassName>
    );
  }

  componentWillMount() {
    const {
      fetchGroup,
      groupid
    } = this.props;

    fetchGroup(groupid)
    .then(({error={}}) => {
      if (error.response && error.response.status === 404) {
        alert('This group does not exist');
      }
    });
  }
}

export function donateToGroup(amount, token) {
  const {
    groupid,
    notify,
    donate
  } = this.props;

  const payment = {
    stripeToken: token.id,
    email: token.email,
    amount
  };

  return donate(groupid, payment)
  .then(rejectError.bind(this))
  .then(() => notify('success', 'Thank you for your donation'))
  .catch(error => notify('error', error.message));
}

export default connect(mapStateToProps, {
  fetchGroup,
  appendDonationForm,
  setDonationCustom,
  donate,
  notify,
  resetNotifications
})(PublicGroup);

function mapStateToProps({router, groups, form, notification}) {
  const groupid = router.params.groupid;
  const amount = form.donation.attributes.amount || 5;
  const stripeAmount = convertToCents(amount);

  return {
    groupid,
    group: groups[groupid] || {},
    amount,
    stripeAmount,
    isCustomMode: form.donation.isCustomMode,
    notification,
    inProgress: groups.donateInProgress
  };
}
