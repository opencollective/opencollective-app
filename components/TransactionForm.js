import React, { Component } from 'react';
import classnames from 'classnames';
import moment from 'moment';

import formatCurrency from '../lib/format_currency';

import paymentMethods from '../ui/payment_methods';

import ImageUpload from './ImageUpload';
import Input from './Input';
import SelectTag from './SelectTag';
import Select from './Select';
import TextArea from './TextArea';
import Notification from './Notification';
import SubmitButton from './SubmitButton';
import DatePicker from './DatePicker';

class TransactionForm extends Component {

  vatInput() {
    const {
      enableVAT,
      transaction,
      group,
      appendTransactionForm
    } = this.props;

    if (!enableVAT) return;

    let vatInput = (
      <div>
        <span className='Label'>VAT: </span>
        <Input
          placeholder={formatCurrency(0, group.currency)}
          hasError={transaction.error.vat}
          value={transaction.attributes.vat}
          handleChange={vat => appendTransactionForm({vat})} />
      </div>
    );

    return vatInput;
  }

  render() {
    const {
      transaction,
      tags,
      group,
      appendTransactionForm,
      isUploading,
      enableVAT
    } = this.props;

    const attributes = transaction.attributes;

    const className = classnames({
      'TransactionForm': true,
      'TransactionForm--isUploading': isUploading,
      'js-form': true, // for testing
    });

    let amountPlaceholder = formatCurrency(0, group.currency);
    if (enableVAT) {
      amountPlaceholder += ' (including VAT)';
    }

    return (
      <div className={className}>
        <Notification {...this.props} />
        <ImageUpload
          {...this.props}
          value={attributes.link}
          onFinished={({url: link}) => appendTransactionForm({link})} />
        <form
          name='transaction'
          className='TransactionForm-form'
          onSubmit={this.handleSubmit.bind(this)} >
          <div>
            <span className='Label'>Description: </span>
            <Input
              hasError={transaction.error.description}
              value={transaction.attributes.description}
              handleChange={description => appendTransactionForm({description})} />
          </div>
          <div>
            <span className='Label'>Amount: </span>
            <Input
              placeholder={amountPlaceholder}
              hasError={transaction.error.amount}
              value={transaction.attributes.amount}
              handleChange={amount => appendTransactionForm({amount})} />
          </div>
          {this.vatInput()}
          <div className='Input'>
            <label className='Label'>Date:</label>
            <DatePicker
              selected={moment(attributes.createdAt)}
              maxDate={moment()}
              handleChange={createdAt => appendTransactionForm({createdAt})} />
          </div>
          <div className='Input u-mb05'>
            <label className='Label'>Category:</label>
            <SelectTag
              attributes={attributes}
              tags={tags}
              handleChange={tag => appendTransactionForm({tags: [tag]})} />
          </div>

          <div className='Input'>
            <label className='Label'>Method:</label>
            <Select
              options={paymentMethods}
              value={attributes.paymentMethod}
              handleChange={paymentMethod => appendTransactionForm({paymentMethod})} />
          </div>

          <div className='Input textarea'>
            <label className='Label'>Note:</label>
            <TextArea
              placeholder='Optional'
              value={attributes.comment}
              handleChange={comment => appendTransactionForm({comment})} />
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
    const {
      tags,
      resetTransactionForm,
      appendTransactionForm,
    } = this.props;

    resetTransactionForm();
    appendTransactionForm({tags: [tags[0]]});

  }
}

export default TransactionForm;
