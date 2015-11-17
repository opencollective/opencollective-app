import React, { Component } from 'react';
import { connect } from 'react-redux';

import Content from './Content';

import Header from '../components/Header';
import Notification from '../components/Notification';
import DonationForm from '../components/DonationForm';

import setDonationAmount from '../actions/form/set_donation_amount';
import setDonationCustom from '../actions/form/set_donation_custom';
import resetNotifications from '../actions/notification/reset';
import fetchGroup from '../actions/groups/fetch_by_id';

export class Donation extends Component {
  render() {
    return (
      <div className='Donation'>
        <Header title='Donate' hasBackButton={true} />
        <Content>
          {this.notification(this.props)}
          <div className='padded'>
            <DonationForm {...this.props} />
          </div>
        </Content>
      </div>
    );
  }

  componentWillMount() {
    this.props.fetchGroup(this.props.groupid);
  }

  notification({notification, resetNotifications}) {
    return (
      <Notification
        {...notification}
        resetNotifications={resetNotifications} />
    );
  }
}

export default connect(mapStateToProps, {
  resetNotifications,
  fetchGroup,
  setDonationAmount,
  setDonationCustom
})(Donation);

function mapStateToProps({router, groups, form}) {
  const groupid = router.params.groupid;

  return {
    groupid,
    group: groups[groupid] || {},
    amount: form.donation.amount,
    isCustomMode: form.donation.isCustomMode
  };
}
