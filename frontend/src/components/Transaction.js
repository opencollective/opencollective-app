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
      user,
      isDonation,
      isPublic
    } = this.props;

    const prefix = isPublic ? '/public' : '';

    function getAmount(amount) {
      if (isDonation) {
        return amount;
      }
      return (amount/100).toFixed(2);
    }

    return (
      <div className='Transaction'>
        <Link to={`${prefix}/groups/${GroupId}/transactions/${id}`}>
          <ProfilePhoto url={user && user.avatar} />
          <div className='Transaction-info'>
            <div className='Transaction-created'>
              {createdAt ? moment(createdAt).fromNow() : ''}
            </div>
            <div className='Transaction-description'>{description}</div>
            <div className='Transaction-status'>
              <div className='Transaction-amount'><Currency value={getAmount(amount)} currency={currency} precision={2} /></div>
              <div className='Transaction-approved'>
                {!isDonation && <ExpenseStatus status={this.props.status} />}
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
