import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { fetchTransaction, approveTransaction, rejectTransaction } from '../actions/transactions';
import { fetchGroup } from '../actions/groups';
import { appendTransactionForm } from '../actions/form';
import { fetchUserIfNeeded } from '../actions/users';
import Content from './Content';
import Header from '../components/Header';
import ApproveButton from '../components/ApproveButton';
import RejectButton from '../components/RejectButton';
import TransactionDetailTitle from '../components/TransactionDetailTitle';
import TransactionDetailComment from '../components/TransactionDetailComment';
import TransactionDetailInfo from '../components/TransactionDetailInfo';

class TransactionDetail extends Component {
  render() {
    const {
      group,
      transaction,
      tags,
      user,
      inProgress,
      isLoading
    } = this.props;

    return (
      <div>
        <Header title={group.name} hasBackButton={true} />
        <Content isLoading={isLoading}>
          <TransactionDetailTitle
            description={transaction.description} />

          <div className='TransactionDetail'>
            <div className='TransactionDetail-image'>
              <img src={transaction.link} />
            </div>

            <TransactionDetailInfo
              transaction={transaction}
              tags={tags}
              handleChange={this.handleTag.bind(this)} />

            <TransactionDetailComment
              transaction={transaction}
              user={user} />

            <div className='TransactionDetail-controls'>
              <ApproveButton
                approveTransaction={this.approveTransaction.bind(this)}
                inProgress={inProgress} />
              <RejectButton
                rejectTransaction={this.rejectTransaction.bind(this)}
                inProgress={inProgress} />
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
    .then(() => fetchUserIfNeeded(this.props.transaction.UserId));
  }

  handleTag(value) {
    this.props.appendTransactionForm({
      tags: [value]
    });
  }

  approveTransaction() {
    const { group, transaction, approveTransaction } = this.props;

    approveTransaction(group.id, transaction.id)
    .then(() => this.nextPage());
  }

  rejectTransaction() {
    const { group, transaction, rejectTransaction } = this.props;

    rejectTransaction(group.id, transaction.id)
    .then(() => this.nextPage())
  }

  nextPage() {
    const { group, pushState } = this.props;

    pushState(null, `/groups/${group.id}/transactions`)
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
    user: state.users[transaction.UserId] || {},
    inProgress: state.transactions.inProgress,
    isLoading: !transaction.id
  };
}
