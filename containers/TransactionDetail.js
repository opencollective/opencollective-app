import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import moment from 'moment';

import { fetchTransaction, approveTransaction, rejectTransaction } from '../actions/transactions';
import { fetchGroup } from '../actions/groups';
import { appendTransactionForm } from '../actions/form';
import { fetchUserIfNeeded } from '../actions/users';

import Content from './Content';
import Header from '../components/Header';
import Currency from '../components/Currency';
import ApproveButton from '../components/ApproveButton';
import RejectButton from '../components/RejectButton';
import SelectTag from '../components/SelectTag';
import TransactionDetailTitle from '../components/TransactionDetailTitle';
import TransactionComment from '../components/TransactionComment';

class TransactionDetail extends Component {
  render() {
    const { group, transaction, tags, user } = this.props;
    return (
      <div>
        <Header title={group.name} hasBackButton={true} />
        <Content>
          <TransactionDetailTitle
            createdAt={transaction.createdAt}
            description={transaction.description} />
          <div className='TransactionDetail'>

            <div className='TransactionDetail-image'>
              <img src={transaction.link} />
            </div>

            <div className='TransactionDetail-info'>
              <div className='TransactionDetail-price'>
                <Currency value={transaction.amount} />
              </div>

              <div className='TransactionDetail-category'>
                Category
                <SelectTag
                  tags={tags}
                  attributes={transaction}
                  handleChange={this.handleTag.bind(this)}
                />
              </div>
            </div>
            <TransactionComment
              transaction={transaction}
              user={user}
            />

            <div className='TransactionDetail-controls'>
              <ApproveButton
                approveTransaction={this.approveTransaction.bind(this)} />
              <RejectButton
                rejectTransaction={this.rejectTransaction.bind(this)} />
            </div>
          </div>
        </Content>
      </div>
    );
  }

  componentDidMount() {
    const {
      fetchTransaction,
      fetchGroup,
      fetchUserIfNeeded,
      groupid,
      transactionid
    } = this.props;

    fetchGroup(groupid);
    fetchTransaction(groupid, transactionid)
    .then(() => {
      fetchUserIfNeeded(this.props.transaction.UserId);
    });
  }

  handleTag(value) {
    this.props.appendTransactionForm({
      tags: [value]
    });
  }

  approveTransaction() {
    const { group, transaction, approveTransaction, pushState } = this.props;

    approveTransaction(group.id, transaction.id)
    .then(() => pushState(null, `/groups/${group.id}/transactions`))
  }

  rejectTransaction() {
    const { group, transaction, rejectTransaction, pushState } = this.props;

    rejectTransaction(group.id, transaction.id)
    .then(() => pushState(null, `/groups/${group.id}/transactions`))
  }
}

export default connect(mapStateToProps, {
  fetchTransaction,
  approveTransaction,
  rejectTransaction,
  fetchGroup,
  appendTransactionForm,
  pushState,
  fetchUserIfNeeded
})(TransactionDetail);

function mapStateToProps(state) {
  const { transactionid, groupid } = state.router.params;
  const transaction = state.transactions[transactionid] || {};
  return {
    groupid,
    transactionid,
    group: state.groups[groupid] || {},
    transaction,
    tags: state.form.transaction.defaults.tags,
    user: state.users[transaction.UserId] || {}
  };
}
