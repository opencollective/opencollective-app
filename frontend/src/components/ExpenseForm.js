import React, { Component } from 'react';
import classnames from 'classnames';
import moment from 'moment';

import formatCurrency from '../lib/format_currency';

import payoutMethods from '../ui/payout_methods';

import ImageUpload from './ImageUpload';
import Input from './Input';
import Select from './Select';
import TextArea from './TextArea';
import Notification from './Notification';
import SubmitButton from './SubmitButton';
import DatePicker from './DatePicker';
import {CURRENCIES} from '../constants/expenses';

class ExpenseForm extends Component {

  vatInput() {
    const {
      enableVAT,
      expense,
      group,
      appendExpenseForm
    } = this.props;

    if (!enableVAT) return;

    // TODO support non-group currency
    return (
      <div>
        <span className='inline'>VAT: </span>
        <Input
          placeholder={formatCurrency(0, group.currency)}
          hasError={expense.error.vat}
          value={expense.attributes.vat}
          handleChange={vat => appendExpenseForm({vat})} />
      </div>
    );
  }

  render() {
    const {
      expense,
      tags,
      appendExpenseForm,
      isUploading,
      enableVAT,
      children
    } = this.props;

    const attributes = expense.attributes;

    const className = classnames({
      'TransactionForm': true,
      'TransactionForm--isUploading': isUploading,
      'js-form': true, // for testing
    });

    let amountPlaceholder = 0;
    if (enableVAT) {
      amountPlaceholder += ' (including VAT)';
    }

    return (
      <div className={className}>
        <Notification {...this.props} />
        <ImageUpload
          {...this.props}
          value={attributes.attachment}
          onFinished={({url: attachment}) => appendExpenseForm({attachment})} />
        <form
          name='expense'
          className='TransactionForm-form'
          onSubmit={this.handleSubmit.bind(this)} >
          <div>
            <label className='inline'>Title: </label>
            <Input
              customClass='js-transaction-description'
              hasError={expense.error.title}
              value={expense.attributes.title}
              handleChange={title => appendExpenseForm({title})} />
          </div>
          <div>
            <label className='inline'>Amount: </label>
            <Input
              customClass='js-transaction-amount'
              placeholder={amountPlaceholder}
              hasError={expense.error.amountText}
              value={expense.attributes.amountText}
              handleChange={amountText => appendExpenseForm({amountText})} />
          </div>
          <div>
            <label className='inline'>Currency: </label>
            <Select
              value={attributes.currency}
              options={CURRENCIES}
              handleChange={currency => appendExpenseForm({currency})} />
          </div>
          {this.vatInput()}
          <div className='Input'>
            <label className='inline'>Date:</label>
            <DatePicker
              selected={moment(attributes.incurredAt)}
              maxDate={moment()}
              handleChange={incurredAt => appendExpenseForm({incurredAt})} />
          </div>
          <div className='Input u-mb05'>
            <label className='inline'>Category:</label>
            <Select
              value={attributes.category}
              options={tags}
              handleChange={category => appendExpenseForm({category})} />
          </div>

          <div className='Input'>
            <label className='inline'>Method:</label>
            <Select
              options={payoutMethods}
              value={attributes.payoutMethod}
              handleChange={payoutMethod => appendExpenseForm({payoutMethod})} />
          </div>

          <div className='Input textarea'>
            <label className='inline'>Note:</label>
            <TextArea
              placeholder='Optional'
              value={attributes.notes}
              handleChange={notes => appendExpenseForm({notes})} />
          </div>
          {children || <SubmitButton />}
        </form>
      </div>
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit(this.props.expense);
  }

  componentDidMount() {
    const {
      category,
      resetExpenseForm,
      appendExpenseForm
    } = this.props;

    resetExpenseForm();
    appendExpenseForm({category});

  }
}

export default ExpenseForm;
