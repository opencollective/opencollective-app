import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createTransaction } from '../actions/transactions';
import { uploadImage } from '../actions/images';
import Header from '../components/Header';
import ImageUpload from '../components/ImageUpload';
import TextInput from '../components/TextInput';
import MoneyInput from '../components/MoneyInput';
import DatePicker from '../components/DatePicker';
import Content from './Content';

class TransactionNewConnector extends Component {
  constructor(props) {
    super(props);
    this.state =  { link: '' };
  }

  render() {
    const { createTransaction, routeParams } = this.props;
    const { groupid } = routeParams;

    return (
      <div>
        <Header title='Submit Expense' hasBackButton={true} />
        <Content>
          <div className='padded'>
            <ImageUpload {...this.props} onFinished={this.handleUpload.bind(this)} />
            <img src={this.state.link} />

            <form name='transaction' className='TransactionForm' onSubmit={this.handleSubmit.bind(this)}>
              <TextInput labelText='Title' handleChange={this.handleDescription.bind(this)} />
              <MoneyInput labelText='Amount' handleChange={this.handleAmount.bind(this)} />
              <DatePicker labelText='Date' handleChange={this.handleDate.bind(this)} />
              <TextInput labelText='Type' handleChange={this.handleType.bind(this)} />

              <button type='submit' className='Button Button--submit'>Submit</button>
            </form>
          </div>
        </Content>
      </div>
    );
  }

  handleSubmit(e) {
    e.preventDefault();

    const { link, amount, description } = this.state;

    this.createTransaction({
      amount,
      description,
      link,
    });
  }


  createTransaction(transaction) {
    const { createTransaction, routeParams} = this.props;
    const { groupid } = routeParams;

    createTransaction(groupid, transaction);
  }

  handleDescription(description) { this.setState({description}); }

  handleAmount(amount) { this.setState({amount}); }

  handleDate(createdAt) { this.setState({createdAt}); }

  handleUpload(image) { this.setState({link: image.url});}

  handleType(tag) { this.setState({tags: [tag]}); }
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
