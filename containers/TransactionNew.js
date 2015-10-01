import React, { Component } from 'react';
import Header from '../components/Header';
import ImageUpload from '../components/ImageUpload';

class TransactionNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: { url: '' }
    };
  }

  render() {
    const { createTransaction } = this.props;
    return (
      <div>
        <Header title='Submit Expense' hasBackButton={false} />
          <ImageUpload {...this.props} onFinished={this.handleUpload.bind(this)}/>
          <img src={this.state.image.url} />
          <form name='transaction' onSubmit={this.handleSubmit.bind(this)} className='px2 mt2'>
            <input ref='amount' name='amount' type='text' className='field block mb2' />
            <input ref='description' name='description' type='text' className='field block mb2' />
            <hr/>
            <button type='submit' className='btn btn-primary block mt2'>Submit</button>
          </form>
      </div>
    );
  }

  handleSubmit(e) {
    e.preventDefault();

    const amount = React.findDOMNode(this.refs.amount).value.trim();
    const description = React.findDOMNode(this.refs.description).value.trim();

    const data = new FormData();
    data.append('amount', amount);
    data.append('description', description);
    data.append('link', link);

    this.createTransaction(data);
  }

  handleUpload(image) {
    this.setState({image});
  }

  createTransaction(transaction) {
    const { groupid, createTransaction } = this.props;
    createTransaction(groupid, transaction);
  }
}

export default TransactionNew;
