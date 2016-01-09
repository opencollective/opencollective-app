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
  
  vatInput() {
    const { vats, appendTransactionForm } = this.props;
    
    if (!vats || vats.length == 0) return;
    
    let vatInput = (
      <div>
        <span className='Label'>VAT: </span>
        <Select
          options={vats}
          value={vats[0].value}
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
              value={transaction.attributes.description}
              handleChange={description => appendTransactionForm({description})} />
          </div>
          <div>
            <span className='Label'>Amount: </span>
            <Input
              placeholder={formatCurrency(0, group.currency)}
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
      vats,
      tags,
      resetTransactionForm,
      appendTransactionForm
    } = this.props;

    resetTransactionForm();
    
    appendTransactionForm({tags: [tags[0]]});
    
    if(vats && vats.length > 0)
      appendTransactionForm({vat:vats[0].value});
  }
}

export default TransactionForm;
