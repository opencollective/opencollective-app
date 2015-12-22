import React, { Component } from 'react';
import classnames from 'classnames';
import moment from 'moment';
import formatCurrency from '../lib/format_currency';

import rejectError from '../lib/reject_error';

import ImageUpload from './ImageUpload';
import Input from './Input';
import SelectTag from './SelectTag';
import Notification from './Notification';
import SubmitButton from './SubmitButton';
import DatePicker from './DatePicker';

class TransactionForm extends Component {

  render() {
    const {
      transaction,
      tags,
      group
    } = this.props;

    const attributes = transaction.attributes;

    return (
      <div className={this.className(this.props)}>
        <Notification {...this.props} />
        <ImageUpload
          {...this.props}
          url={attributes.link}
          onFinished={this.handleUpload.bind(this)} />
        <form
          name='transaction'
          className='TransactionForm-form'
          onSubmit={this.handleSubmit.bind(this)} >
          <Input
            labelText='Title'
            hasError={transaction.error.description}
            handleChange={this.handleField.bind(this, 'description')} />
          <Input
            labelText='Amount'
            placeholder={formatCurrency(0, group.currency)}
            hasError={transaction.error.amount}
            handleChange={this.handleField.bind(this, 'amount')} />
          <div className='Input'>
            <label className='Label'>Date:</label>
            <DatePicker
              selected={moment(attributes.createdAt)}
              maxDate={moment()}
              handleChange={this.handleField.bind(this, 'createdAt')} />
          </div>
          <div className='Input'>
            <label className='Label'>Type:</label>
            <SelectTag
              attributes={attributes}
              tags={tags}
              handleChange={this.handleTag.bind(this)} />
          </div>
          <SubmitButton />
        </form>
      </div>
    );
  }

  className({isUploading}) {
    return classnames({
      'TransactionForm': true,
      'TransactionForm--isUploading': isUploading,
      'js-form': true, // for testing
    });
  }

  handleSubmit(event) {
    const {
      groupid,
      transaction,
      notify,
      handleSubmit
    } = this.props;
    const attributes = transaction.attributes;

    event.preventDefault();

    return this.props.validateTransaction(attributes)
    .then(rejectError.bind(this, 'validationError'))
    .then(() => handleSubmit(attributes, groupid))
    .catch(error => notify('error', error.message));
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
