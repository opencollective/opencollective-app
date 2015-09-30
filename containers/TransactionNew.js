import React, { Component } from 'react';
import Header from '../components/Header';
import ImageUpload from '../components/ImageUpload';

class TransactionNew extends Component {
  render() {
    const { createTransaction } = this.props;
    return (
      <div>
        <Header title='Submit Expense' hasBackButton={false} />
          <form onSubmit={this.handleSubmit.bind(this)} className='px2 mt2'>
            <ImageUpload />
            <label className='block mt2'>Amount</label>
            <input ref='amount' type='text' className='field block mb2' />
            <label className='block'>Description</label>
            <input ref='description' type='text' className='field block mb2' />
            <hr/>
            <button type='submit' className='btn btn-primary block mt2'>Submit</button>
          </form>
      </div>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    var amount = React.findDOMNode(this.refs.amount).value.trim();
    var description = React.findDOMNode(this.refs.description).value.trim();
    this.createTransaction({amount, description});
    return;
  }

  createTransaction(transaction) {
    const { groupid, createTransaction } = this.props;
    createTransaction(groupid, transaction);
  }
}

export default TransactionNew;
