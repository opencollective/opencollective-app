import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchTransaction, approveTransaction, rejectTransaction } from '../actions/transactions';
import { fetchGroup } from '../actions/groups';
import { appendTransactionForm } from '../actions/form';
import Header from '../components/Header';
import Currency from '../components/Currency';
import ApproveButton from '../components/ApproveButton';
import RejectButton from '../components/RejectButton';
import SelectTag from '../components/SelectTag';
import Content from './Content';

class TransactionDetail extends Component {
  render() {
    const { group, transaction, tags } = this.props;
    const date = transaction ? moment(transaction.createdAt).fromNow() : '';

    return (
      <div>
        <Header title={group.description} hasBackButton={true} />

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
              <ApproveButton groupid={group.id} transactionid={transaction.id} {...this.props}/>
              <RejectButton groupid={group.id} transactionid={transaction.id} {...this.props}/>
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
}

export default connect(mapStateToProps, {
  fetchTransaction,
  approveTransaction,
  rejectTransaction,
  fetchGroup,
  appendTransactionForm
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
