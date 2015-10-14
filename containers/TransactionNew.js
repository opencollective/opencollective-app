import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

import { createTransaction } from '../actions/transactions';
import { resetTransactionForm, appendTransactionForm } from '../actions/form';
import { uploadImage } from '../actions/images';

import Content from './Content';
import Header from '../components/Header';
import ImageUpload from '../components/ImageUpload';
import Input from '../components/Input';
import MoneyInput from '../components/MoneyInput';
import SelectTag from '../components/SelectTag';
import Icon from '../components/Icon';

class TransactionNew extends Component {
  render() {
    const { transaction, tags } = this.props;
    const attributes = transaction.attributes;

    return (
      <div>
        <Header title='Submit Expense' hasBackButton={true} />
        <Content>
          <div className='padded'>
            <ImageUpload {...this.props} onFinished={this.handleUpload.bind(this)} />
            <div className='TransactionNew-imagePreview'>
              <img src={attributes.link} />
            </div>

            <form
              name='transaction'
              className='TransactionForm'
              onSubmit={this.handleSubmit.bind(this)} >
              <Input
                labelText='Title'
                handleChange={this.handleField.bind(this, 'description')} />
              <MoneyInput
                labelText='Amount'
                handleChange={this.handleField.bind(this, 'amount')} />
              <Input
                labelText='Date'
                type='date'
                handleChange={this.handleField.bind(this, 'createdAt')} />
              <div className='Input'>
                <label className='Label'>Type:</label>
                <SelectTag
                  attributes={attributes}
                  tags={tags}
                  handleChange={this.handleTag.bind(this)}
                />
              </div>
              <button
                type='submit'
                className='Button Button--submit'>
                <Icon type='upload' />
                Submit
              </button>
            </form>
          </div>
        </Content>
      </div>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    const { groupid, transaction, createTransaction, pushState } = this.props;

    createTransaction(groupid, transaction.attributes)
    .then(() => pushState(null, `/groups/${groupid}/transactions`) );
  }

  handleField(key, value) {
    this.props.appendTransactionForm({
      [key]: value
    });
  }

  handleTag(value) {
    this.props.appendTransactionForm({
      tags: [value]
    });
  }

  handleUpload({url}) {
    this.props.appendTransactionForm({ link: url });
  }

  componentDidMount() {
    this.props.resetTransactionForm();
  }

}

export default connect(mapStateToProps, {
  createTransaction,
  uploadImage,
  resetTransactionForm,
  appendTransactionForm,
  pushState
})(TransactionNew);

function mapStateToProps(state) {
  return {
    groupid: state.router.params.groupid,
    transaction: state.form.transaction,
    tags: state.form.transaction.defaults.tags
  };
}
