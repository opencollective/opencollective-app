import React, { Component } from 'react';
import Header from '../components/Header';
import ImageUpload from '../components/ImageUpload';

class TransactionNew extends Component {
  render() {
    const { createTransaction } = this.props;
    return (
      <div>
        <Header title='Submit Expense' hasBackButton={false} />
        <div className='px2'>
          <ImageUpload />
        </div>
      </div>
    );
  }
}

export default TransactionNew;
