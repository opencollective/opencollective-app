import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createTransaction } from '../actions/transactions';
import { uploadImage } from '../actions/images';
import Header from '../components/Header';
import ImageUpload from '../components/ImageUpload';
import Content from './Content';

class TransactionNewConnector extends Component {
  constructor(props) {
    super(props);
    const data = {
      link: '',
    };
    this.state = data;
  }

  render() {
    const { createTransaction, routeParams } = this.props;
    const { groupid } = routeParams;

    return (
      <div>
        <Header title='Submit Expense' hasBackButton={false} />

        <Content>
          <ImageUpload onFinished={this.handleUpload.bind(this)} />
          <img src={this.state.link} />

          <form name='transaction' onSubmit={this.handleSubmit.bind(this)}>
            <label>Amount</label>
            <input ref='amount' name='amount' type='text' className='field block mb2' />

            <label>Description</label>
            <input ref='description' name='description' type='text' className='field block mb2' />

            <hr/>
            <button type='submit' className='btn btn-primary block mt2'>Submit</button>
          </form>
        </Content>
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
    const { createTransaction, routeParams} = this.props;
    const { groupid } = routeParams;

    createTransaction(groupid, transaction);
  }
}

export default connect(mapStateToProps, {
  createTransaction,
  uploadImage
})(TransactionNewConnector);

function mapStateToProps(state) {
  return {
    groups: state.groups,
    transactions: state.transactions,
  };
}
