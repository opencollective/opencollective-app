import React, { Component } from 'react';
import Header from '../components/Header';
import ImageUpload from '../components/ImageUpload';

class TransactionNew extends Component {
  constructor(props) {
    super(props);
    const data = {
      link: '',
    };
    this.state = data;
  }

  render() {
    const { createTransaction } = this.props;
    return (
      <div>
        <Header title='Submit Expense' hasBackButton={false} />
        <div className='px2 mt2'>
          <ImageUpload {...this.props} onFinished={this.handleUpload.bind(this)} />
          <img src={this.state.link} />

          <form name='transaction' onSubmit={this.handleSubmit.bind(this)}>
            <label>Amount</label>
            <input ref='amount' name='amount' type='text' className='field block mb2' />

            <label>Description</label>
            <input ref='description' name='description' type='text' className='field block mb2' />

            <hr/>
            <button type='submit' className='btn btn-primary block mt2'>Submit</button>
          </form>
        </div>
      </div>
    );
  }

  handleSubmit(e) {
    e.preventDefault();

    const amount = React.findDOMNode(this.refs.amount).value.trim();
    const description = React.findDOMNode(this.refs.description).value.trim();
    const {link} = this.state;

    this.createTransaction({
      amount,
      description,
      link,
    });
  }

  handleUpload(image) {
    this.setState({link: image.url});
  }

  createTransaction(transaction) {
    const { groupid, createTransaction } = this.props;
    createTransaction(groupid, transaction);
  }
}

export default TransactionNew;
