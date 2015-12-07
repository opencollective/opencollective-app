import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import BodyClassName from 'react-body-classname';

import rejectError from '../lib/reject_error';
import convertToCents from '../lib/convert_to_cents';

import PublicHeader from '../components/PublicHeader';
import Notification from '../components/Notification';
import PublicGroupForm from '../components/PublicGroupForm';
import PublicGroupThanks from '../components/PublicGroupThanks';
import PublicGroupHeader from '../components/PublicGroupHeader';

import appendDonationForm from '../actions/form/append_donation';
import setDonationCustom from '../actions/form/set_donation_custom';
import fetchGroup from '../actions/groups/fetch_by_id';
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
            {this.props.showThankYouPage ?
              <PublicGroupThanks /> :
              <PublicGroupForm
                {...this.props}
                onToken={donateToGroup.bind(this, this.props.stripeAmount)} />
            }
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
  pushState
})(PublicGroup);

function mapStateToProps({router, groups, form, notification}) {
  const groupid = router.params.groupid;
  const status = router.location.query.status;
  const amount = form.donation.attributes.amount || 0;
  const stripeAmount = convertToCents(amount);

  return {
    groupid,
    group: groups[groupid] || {},
    amount,
    stripeAmount,
    isCustomMode: form.donation.isCustomMode,
    notification,
    inProgress: groups.donateInProgress,
    stripeKey: window.__env.stripePublicKey, // Next level config
    showThankYouPage: status === 'thankyou'
  };
}
