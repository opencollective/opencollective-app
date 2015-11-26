import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import values from 'lodash/object/values';
import filter from 'lodash/collection/filter';

import rejectError from '../lib/reject_error';

import Content from './Content';

import PublicGroupHeader from '../components/PublicGroupHeader';
import GroupTitle from '../components/GroupTitle';

import fetchGroup from '../actions/groups/fetch_by_id';
import fetchTransactions from '../actions/transactions/fetch_by_group';

export class PublicGroup extends Component {
  render() {

    return (
      <div className='PublicGroup'>
        <div className='padded'>
          <PublicGroupHeader {...this.props.group} />
          <GroupTitle
            group={this.props.group}
            label='Available budget' />
        </div>
      </div>
    );
  }

  componentWillMount() {
    const {
      fetchGroup,
      fetchTransactions,
      groupid
    } = this.props;

    fetchGroup(groupid);
    fetchTransactions(groupid, { per_page: 1 });
  }
}


export default connect(mapStateToProps, {
  fetchGroup,
  fetchTransactions
})(PublicGroup);

function mapStateToProps({router, groups, form, session, users, transactions, notification}) {
  const groupid = router.params.groupid;
  const trans = values(transactions).filter({GroupId: groupid});

console.log('router', groupid, router);
  return {
    groupid,
    group: groups[groupid] || {}
  };
}
