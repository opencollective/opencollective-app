import React, { Component } from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';

import values from 'lodash/object/values';
import filter from 'lodash/collection/filter';

import PublicGroupHeader from '../components/PublicGroupHeader';
import GroupTitle from '../components/GroupTitle';

import fetchGroup from '../actions/groups/fetch_by_id';
import fetchTransactions from '../actions/transactions/fetch_by_group';

export class PublicGroup extends Component {
  render() {
    const { group } = this.props;

    return (
      <div className='PublicGroup'>
        <div className='padded'>
          <PublicGroupHeader {...group} />
          <GroupTitle
            group={group}
            label='Available budget' />
          <StripeCheckout
            token={handleToken}
            stripeKey='pk_test_6pRNASCoBOKtIshFeQd4XMUh'
            name={group.name}
            description={group.description}>
            <div className='Button'>
              Donate
            </div>
          </StripeCheckout>
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

function handleToken(res) {
  console.log('res', res);
}

export default connect(mapStateToProps, {
  fetchGroup,
  fetchTransactions
})(PublicGroup);

function mapStateToProps({router, groups, transactions}) {
  const groupid = router.params.groupid;
  const transactionsArray = values(transactions);

console.log('router', groupid, router);
  return {
    groupid,
    transactions: filter(transactionsArray, {GroupId: Number(groupid)}),
    group: groups[groupid] || {}
  };
}
