import React, { Component } from 'react';
import { connect } from 'react-redux';
import BodyClassName from 'react-body-classname';

import fetchUserIfNeeded from '../actions/users/fetch_by_id_cached';
import fetchTransactions from '../actions/transactions/fetch_by_group';
import fetchGroup from '../actions/groups/fetch_by_id';

import sortByDate from '../lib/sort_by_date';
import getUniqueValues from '../lib/get_unique_values';
import filterCollection from '../lib/filter_collection';

import PublicHeader from '../components/PublicHeader';
import Currency from '../components/Currency';
import PublicFooter from '../components/PublicFooter';
import TransactionsList from '../components/TransactionsList';

export class PublicTransactions extends Component {
  render() {
    const {
      group,
      transactions,
      users
    } = this.props;

    return (
      <BodyClassName className='Public'>
        <div className='PublicTransactions'>
          <PublicHeader />
          <div className='PublicContent'>
            <div className='u-center u-py1'>
              <div className='u-bold u-py05'>{group.name}</div>
              <div className='u-mb1'>{group.description}</div>
            </div>

            <div className='Well PublicTransactions-well'>
              <span className='Well-primary'>
                Available budget
              </span>
              <span className='Well-right'>
                <Currency value={group.balance} />
              </span>
            </div>

            <TransactionsList transactions={transactions} users={users} />
          </div>
          <PublicFooter />
        </div>
      </BodyClassName>
    );
  }

  componentDidMount() {
    const {
      fetchGroup,
      fetchTransactions,
      groupid,
      fetchUserIfNeeded,
    } = this.props;

    fetchGroup(groupid);
    fetchTransactions(groupid)
    .then(({transactions}) => {
      return getUniqueValues(transactions, 'UserId').map(fetchUserIfNeeded);
    });
  }

}

export default connect(mapStateToProps, {
  fetchTransactions,
  fetchGroup,
  fetchUserIfNeeded
})(PublicTransactions);

function mapStateToProps({
  router,
  groups,
  transactions,
  users
}) {
  const groupid = router.params.groupid;
  const group = groups[groupid] || {};
  const GroupId = Number(groupid);

  return {
    groupid,
    group,
    users,
    transactions: filterCollection(transactions, { GroupId }).sort(sortByDate),
  };
}
