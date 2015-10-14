import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import moment from 'moment';

import { fetchTransaction, approveTransaction, rejectTransaction } from '../actions/transactions';
import { fetchGroup } from '../actions/groups';
import { appendTransactionForm } from '../actions/form';

import Content from './Content';
import Header from '../components/Header';
import Currency from '../components/Currency';
import ApproveButton from '../components/ApproveButton';
import RejectButton from '../components/RejectButton';
import SelectTag from '../components/SelectTag';

class TransactionDetail extends Component {
  render() {
    const { group, transaction, tags } = this.props;
    const date = transaction ? moment(transaction.createdAt).fromNow() : '';

    return (
      <div>
        <Header title={group.name} hasBackButton={true} />

        <Content>
          <div className='Well'>
            <div className='Well-secondary'>
              {date}
            </div>
            <div className='Well-primary'>
              {transaction.description}
            </div>
          </div>
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
    const { fetchTransaction, fetchGroup, routeParams } = this.props;
    const { groupid, transactionid } = routeParams;

    fetchTransaction(groupid, transactionid);
    fetchGroup(groupid);
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
  pushState
})(TransactionDetail);

function mapStateToProps(state) {
  const { transactionid, groupid } = state.router.params;

  return {
    groupid,
    transactionid,
    group: state.groups[groupid] || {},
    transaction: state.transactions[transactionid] || {},
    tags: state.form.transaction.defaults.tags
  };
}
