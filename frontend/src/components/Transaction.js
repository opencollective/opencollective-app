import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';

import Currency from './Currency';
import ProfilePhoto from './ProfilePhoto';

class Transaction extends Component {
  render() {
    const {
      amount,
      currency,
      description,
      uuid,
      GroupId,
      createdAt,
      user
    } = this.props;


    return (
      <div className='Transaction'>
        <ProfilePhoto url={user && user.avatar} />
        <div className='Transaction-info'>
          <div className='Transaction-created'>
            {createdAt ? moment(createdAt).fromNow() : ''}
          </div>
          <div className='Transaction-description'>{description}</div>
          <div className='Transaction-status'>
            <div className='Transaction-amount'><Currency value={amount} currency={currency} precision={2} /></div>
          </div>
        </div>
      </div>
    );
  }
}

Transaction.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired
};

export default Transaction;
