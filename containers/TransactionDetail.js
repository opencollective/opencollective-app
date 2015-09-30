import React, { Component } from 'react';
import Header from '../components/Header';
import ApproveButton from '../components/ApproveButton';
import RejectButton from '../components/RejectButton';

class TransactionDetail extends Component {
  render() {
    const { transactions, transactionid } = this.props;
    const transaction = transactions[transactionid] || {};
    return (
      <div>
        <Header title={transaction.description} hasBackButton={true} />
        <div className='px2'>
          {transaction.description} : {transaction.amount}
          <div>
            <ApproveButton {...this.props}/>
            <RejectButton {...this.props}/>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const { groupid, transactionid, fetchTransaction } = this.props;
    fetchTransaction(groupid, transactionid);
  }
}

export default TransactionDetail;
