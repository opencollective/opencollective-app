import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import moment from 'moment';

import ImageUpload from './ImageUpload';
import Input from './Input';
import SelectTag from './SelectTag';
import Icon from './Icon';
import Notification from './Notification';
import SubmitButton from './SubmitButton';
import DatePicker from './DatePicker';

class TransactionForm extends Component {

  render() {
    const {
      transaction,
      tags,
      isUploading,
      notification,
      resetNotifications
    } = this.props;
    const attributes = transaction.attributes;

    return (
      <div className={this.className(this.props)}>
        <Notification
          {...notification}
          resetNotifications={resetNotifications} />
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
            placeholder='$ 10.00'
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
      pushState,
      notify,
      handleSubmit
    } = this.props;
    const attributes = transaction.attributes;

    event.preventDefault();

    this.validate(attributes)
    .then(() => handleSubmit(attributes, groupid))
    .catch(message => notify('error', message));
  }

  validate(attributes) {
    return this.props.validateTransaction(attributes)
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
