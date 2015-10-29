import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import ImageUpload from '../components/ImageUpload';
import Input from '../components/Input';
import SelectTag from '../components/SelectTag';
import Icon from '../components/Icon';
import Notification from '../components/Notification';
import SubmitButton from '../components/SubmitButton';

class TransactionForm extends Component {

  render() {
    const { transaction, tags, isUploading } = this.props;
    const attributes = transaction.attributes;
    const className = classnames({
      'TransactionForm': true,
      'TransactionForm--isUploading': isUploading,
      'js-form': true, // for testing
    });

    return (
      <div className={className}>
        <Notification {...this.props.notification} />
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
          <Input
            labelText='Date'
            type='date'
            hasError={transaction.error.createdAt}
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
