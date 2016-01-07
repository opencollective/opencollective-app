import React, { Component } from 'react';
import classnames from 'classnames';
import moment from 'moment';

import formatCurrency from '../lib/format_currency';

import paymentMethods from '../ui/payment_methods';

import ImageUpload from './ImageUpload';
import Input from './Input';
import SelectTag from './SelectTag';
import Select from './Select';
import Notification from './Notification';
import SubmitButton from './SubmitButton';
import DatePicker from './DatePicker';

class TransactionForm extends Component {

  render() {
    const {
      transaction,
      tags,
      group,
      appendTransactionForm,
      isUploading
    } = this.props;

    const attributes = transaction.attributes;

    const className = classnames({
      'TransactionForm': true,
      'TransactionForm--isUploading': isUploading,
      'js-form': true, // for testing
    });

    return (
      <div className={className}>
        <Notification {...this.props} />
        <ImageUpload
          {...this.props}
          url={attributes.link}
          onFinished={({url: link}) => appendTransactionForm({link})} />
        <form
          name='transaction'
          className='TransactionForm-form'
          onSubmit={this.handleSubmit.bind(this)} >
          <div>
            <span className='Label'>Title: </span>
            <Input
              hasError={transaction.error.description}
              handleChange={description => appendTransactionForm({description})} />
          </div>
          <div>
            <span className='Label'>Amount: </span>
            <Input
              placeholder={formatCurrency(0, group.currency)}
              hasError={transaction.error.amount}
              handleChange={amount => appendTransactionForm({amount})} />
          </div>
          <div className='Input'>
            <label className='Label'>Date:</label>
            <DatePicker
              selected={moment(attributes.createdAt)}
              maxDate={moment()}
              handleChange={createdAt => appendTransactionForm({createdAt})} />
          </div>
          <div className='Input u-mb05'>
            <label className='Label'>Type:</label>
            <SelectTag
              attributes={attributes}
              tags={tags}
              handleChange={tag => appendTransactionForm({tags: [tag]})} />
          </div>

          <div className='Input'>
            <label className='Label'>Payment method:</label>
            <Select
              options={paymentMethods}
              value={attributes.paymentMethod}
              handleChange={paymentMethod => appendTransactionForm({paymentMethod})} />
          </div>
          <SubmitButton />
        </form>
      </div>
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit();
  }

  componentDidMount() {
    this.props.resetTransactionForm();
  }
}

export default TransactionForm;
