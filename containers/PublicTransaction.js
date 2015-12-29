import React, { Component } from 'react';
import { connect } from 'react-redux';
import BodyClassName from 'react-body-classname';

import fetchUserIfNeeded from '../actions/users/fetch_by_id_cached';
import fetchTransaction from '../actions/transactions/fetch_by_id';
import fetchGroup from '../actions/groups/fetch_by_id';

import tags from '../ui/tags';

import PublicHeader from '../components/PublicHeader';
import PublicFooter from '../components/PublicFooter';
import TransactionDetailTitle from '../components/TransactionDetailTitle';
import TransactionDetailComment from '../components/TransactionDetailComment';
import TransactionDetailInfo from '../components/TransactionDetailInfo';

export class PublicTransaction extends Component {
  render() {
    const {
      transaction
    } = this.props;

    return (
      <BodyClassName className='Public'>
        <div className='PublicTransaction'>
          <PublicHeader />
          <div className='PublicContent'>
            <TransactionDetailTitle {...transaction} />
            <div className='PublicTransaction-image'>
              <a href={transaction.link}>
                <img src={transaction.link} />
              </a>
            </div>
            <TransactionDetailInfo {...this.props} />
            {this.comment(this.props)}
          </div>
          <PublicFooter />
        </div>
      </BodyClassName>
    );
  }

  comment(props) {
    return props.transaction.comment ? <TransactionDetailComment {...props} /> : null;
  }

  componentDidMount() {
    const {
      fetchTransaction,
      fetchGroup,
      groupid,
      transactionid,
      fetchUserIfNeeded
    } = this.props;


    fetchGroup(groupid);

    fetchTransaction(groupid, transactionid)
    .then(() => fetchUserIfNeeded(this.props.transaction.UserId));
  }

}

export default connect(mapStateToProps, {
  fetchTransaction,
  fetchGroup,
  fetchUserIfNeeded
})(PublicTransaction);

function mapStateToProps({
  router,
  transactions,
  groups,
  users
}) {
  const { transactionid, groupid } = router.params;
  const group = groups[groupid] || {};
  const transaction = transactions[transactionid] || {};

  return {
    isPublic: true,
    groupid,
    transactionid,
    group,
    transaction,
    user: users[transaction.UserId] || {},
    tags: tags(groupid)
  };
}
