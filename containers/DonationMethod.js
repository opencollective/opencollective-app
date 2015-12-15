import React, { Component } from 'react';
import { connect } from 'react-redux';
import Content from './Content';
import Header from '../components/Header';
import Notification from '../components/Notification';
import DonationMethodForm from '../components/DonationMethodForm';

import fetchGroup from '../actions/groups/fetch_by_id';
import resetNotifications from '../actions/notification/reset';

export class DonationMethod extends Component {
  render() {
    return (
      <div className='DonationMethod'>
        <Header title='Add donation method' hasBackButton={true} />
        <Content>
          <Notification {...this.props} />
          <div className='padded'>
           <DonationMethodForm />
          </div>
        </Content>
      </div>
    );
  }

  componentWillMount() {
    this.props.fetchGroup(this.props.groupid);
  }
};

export default connect(mapStateToProps, {
  resetNotifications,
  fetchGroup
})(DonationMethod);

function mapStateToProps({router, groups}) {
  const groupid = router.params.groupid;

  return {
    groupid,
    group: groups[groupid] || {}
  };
}
