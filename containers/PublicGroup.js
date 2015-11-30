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

import appendDonationForm from '../actions/form/append_donation';
import setDonationCustom from '../actions/form/set_donation_custom';
import fetchGroup from '../actions/groups/fetch_by_id';
import donate from '../actions/groups/donate';
import notify from '../actions/notification/notify';

export class PublicGroup extends Component {
  render() {
    const {
      group,
      amount,
      stripeAmount,
      isCustomMode,
      setDonationCustom,
      appendDonationForm
    } = this.props;

    return (
      <BodyClassName className='Public'>
        <div className='PublicGroup'>
          <PublicHeader />
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
              stripeKey='pk_test_6pRNASCoBOKtIshFeQd4XMUh'
              name={group.name}
              amount={stripeAmount}
              description={group.description}>
              <div className='PublicGroup-buttonContainer'>
                <div className='Button Button--green'>
                  Donate
                </div>
              </div>
            </StripeCheckout>
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

    fetchGroup(groupid);
  }
}

function donateToGroup(amount, token) {
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

  donate(groupid, payment)
  .then(rejectError.bind(this))
  .catch(error => notify('error', error.message));
}

export default connect(mapStateToProps, {
  fetchGroup,
  appendDonationForm,
  setDonationCustom,
  donate,
  notify
})(PublicGroup);

function mapStateToProps({router, groups, form}) {
  const groupid = router.params.groupid;
  const amount = form.donation.attributes.amount || 5;
  const stripeAmount = convertToCents(amount);

  return {
    groupid,
    group: groups[groupid] || {},
    amount,
    stripeAmount,
    isCustomMode: form.donation.isCustomMode,
  };
}
