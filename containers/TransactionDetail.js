import React, { Component } from 'react';
import Header from '../components/Header';
import ApproveButton from '../components/ApproveButton';
import RejectButton from '../components/RejectButton';

class TransactionDetail extends Component {
  render() {
    const {transactions, transactionid, groupid, actions} = this.props;
    const transaction = transactions[transactionid] || {};

    return (
      <div>
        <Header title={transaction.description} hasBackButton={true} />
        <div className='px2'>
          {transaction.description} : {transaction.amount}
          <div>
            <ApproveButton groupid={groupid} transactionid={transactionid} sendApproveTransaction={actions.sendApproveTransaction}/>
            <RejectButton groupid={groupid} transactionid={transactionid} sendRejectTransaction={actions.sendRejectTransaction}/>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.loadTransaction();
  }
}

export default TransactionDetail;
