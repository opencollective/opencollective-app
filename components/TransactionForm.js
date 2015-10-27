import React, { Component, PropTypes } from 'react';

import ImageUpload from '../components/ImageUpload';
import Input from '../components/Input';
import MoneyInput from '../components/MoneyInput';
import SelectTag from '../components/SelectTag';
import Icon from '../components/Icon';
import Notification from '../components/Notification';
import SubmitButton from '../components/SubmitButton';

class TransactionForm extends Component {

  render() {
    const { transaction, tags } = this.props;
    const attributes = transaction.attributes;

    return (
      <div className='padded js-form'>
        <Notification {...this.props.notification} />
        <ImageUpload
          {...this.props}
          url={attributes.link}
          onFinished={this.handleUpload.bind(this)} />
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
          <SubmitButton />
        </form>
      </div>
    );
  }

  handleSubmit(event) {
    const {
      groupid,
      transaction,
      pushState,
      notify,
      handleSubmit
    } = this.props;
    const attributes = transaction.attributes;

    event.preventDefault();

    this.validate(attributes)
    .then(() => handleSubmit(attributes, groupid))
    .catch(error => notify('error', error.message));
  }

  validate(attributes) {
    const {
      validateTransaction,
      resetTransactionFormError
    } = this.props;

    resetTransactionFormError()

    return validateTransaction(attributes)
    .then(() => {
      const error = this.props.validationError;
      return error ? Promise.reject(error) : Promise.resolve(attributes);
    });
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

export default TransactionForm;
