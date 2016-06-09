import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';

import Currency from './Currency';
import ExpenseStatus from './ExpenseStatus';
import ProfilePhoto from './ProfilePhoto';

class Transaction extends Component {
  render() {
    const {
      amount,
      currency,
      description,
      id,
      GroupId,
      createdAt,
      incurredAt,
      user,
      isDonation,
      isPublic,
      status
    } = this.props;

    const prefix = isPublic ? '/public' : '';

    const txDate = incurredAt || createdAt;

    function getAmount(amount) {
      return isDonation ? amount : (amount/100).toFixed(2);
    }

    return (
      <div className='Transaction'>
        <Link to={`${prefix}/groups/${GroupId}/transactions/${id}`}>
          <ProfilePhoto url={user && user.avatar} />
          <div className='Transaction-info'>
            <div className='Transaction-created'>
              {txDate && moment(txDate).fromNow()}
            </div>
            <div className='Transaction-description'>{description}</div>
            <div className='Transaction-status'>
              <div className='Transaction-amount'><Currency value={getAmount(amount)} currency={currency} precision={2} /></div>
              <div className='Transaction-approved'>
                {/* TODO restore this !isDonation && <ExpenseStatus status={status} />*/}
              </div>
            </div>
          </div>
        </Link>
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
